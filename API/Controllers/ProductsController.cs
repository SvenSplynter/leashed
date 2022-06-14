using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;

        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _unitOfWork.Repository<Product>().CountAsync(countSpec);

            var products = await _unitOfWork.Repository<Product>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);

            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductToReturnDto>> CreateProduct(ProductToCreateDto productToCreate)
        {
            var product = _mapper.Map<ProductToCreateDto, Product>(productToCreate);

            _unitOfWork.Repository<Product>().Add(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating product"));

            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> UpdateProduct(int id, ProductToCreateDto productToUpdate)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            _mapper.Map(productToUpdate, product);

            _unitOfWork.Repository<Product>().Update(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating product"));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            foreach (var photo in product.Photos)
            {
                _photoService.DeleteFromDisk(photo);
            }

            _unitOfWork.Repository<Product>().Delete(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting product"));

            return Ok();
        }

        [HttpPut("{id}/photo")]
        public async Task<ActionResult<ProductToReturnDto>> AddProductPhoto(int id, [FromForm] ProductPhotoDto photoDto)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (photoDto.Photo.Length > 0)
            {
                var photo = await _photoService.SaveToDiskAsync(photoDto.Photo);

                if (photo != null)
                {
                    product.AddPhoto(photo.PictureUrl, photo.FileName);

                    _unitOfWork.Repository<Product>().Update(product);

                    var result = await _unitOfWork.Complete();

                    if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding product photo"));
                }
                else
                {
                    return BadRequest(new ApiResponse(400, "Problem saving product photo to disk"));
                }
            }

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpDelete("{id}/photo/{photoId}")]
        public async Task<ActionResult> DeleteProductPhoto(int id, int photoId)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            var photo = product.Photos.SingleOrDefault(x => x.Id == photoId);

            if (photo != null)
            {
                if (photo.IsMain)
                    return BadRequest(new ApiResponse(400,
                        "You cannot delete the main photo"));

                _photoService.DeleteFromDisk(photo);
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Photo does not exist"));
            }

            product.RemovePhoto(photoId);

            _unitOfWork.Repository<Product>().Update(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo product"));

            return Ok();
        }

        [HttpPost("{id}/photo/{photoId}")]
        public async Task<ActionResult<ProductToReturnDto>> SetMainPhoto(int id, int photoId)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (product.Photos.All(x => x.Id != photoId)) return NotFound();

            product.SetMainPhoto(photoId);

            _unitOfWork.Repository<Product>().Update(product);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo product"));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("producttypes")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _unitOfWork.Repository<ProductType>().ListAllAsync());
        }

        [HttpPost("producttypes")]
        public async Task<ActionResult<ProductType>> CreateProductType(ProductTypeToCreateDto productTypeToCreate)
        {
            var productType = _mapper.Map<ProductTypeToCreateDto, ProductType>(productTypeToCreate);

            _unitOfWork.Repository<ProductType>().Add(productType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating productType"));

            return Ok(productType);
        }

        [HttpGet("producttypes/{id}")]
        public async Task<ActionResult<ProductType>> GetProductType([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<ProductType>().GetByIdAsync(id));
        }

        [HttpPut("producttypes/{id}")]
        public async Task<ActionResult<ProductType>> UpdateProductType(int id, ProductTypeToCreateDto productTypeToUpdate)
        {
            var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

            _mapper.Map(productTypeToUpdate, productType);

            _unitOfWork.Repository<ProductType>().Update(productType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating product type"));

            return Ok(productType);
        }

        [HttpDelete("producttypes/{id}")]
        public async Task<ActionResult> DeleteProductType(int id)
        {
            var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

            _unitOfWork.Repository<ProductType>().Delete(productType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting product type"));

            return Ok();
        }

        [HttpGet("colors")]
        public async Task<ActionResult<Pagination<ColorToReturnDto>>> GetColors([FromQuery] ColorSpecParams colorParams)
        {
            var spec = new ColorsWithPhotosSpecification(colorParams);

            var colors = await _unitOfWork.Repository<Color>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Color>, IReadOnlyList<ColorToReturnDto>>(colors);

            return Ok(data);
        }

        [HttpGet("colors/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ColorToReturnDto>> GetColor(int id)
        {
            var spec = new ColorsWithPhotosSpecification(id);

            var color = await _unitOfWork.Repository<Color>().GetEntityWithSpec(spec);
            if (color == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Color, ColorToReturnDto>(color);
        }

        [HttpPost("colors")]
        public async Task<ActionResult<ColorToReturnDto>> CreateColor(ColorToCreateDto colorToCreate)
        {
            var color = _mapper.Map<ColorToCreateDto, Color>(colorToCreate);

            _unitOfWork.Repository<Color>().Add(color);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating color"));

            return Ok(color);
        }

        [HttpPut("colors/{id}")]
        public async Task<ActionResult<ColorToReturnDto>> UpdateColor(int id, ColorToCreateDto colorToUpdate)
        {
            var color = await _unitOfWork.Repository<Color>().GetByIdAsync(id);

            _mapper.Map(colorToUpdate, color);

            _unitOfWork.Repository<Color>().Update(color);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating color"));

            return _mapper.Map<Color, ColorToReturnDto>(color);
        }

        [HttpDelete("colors/{id}")]
        public async Task<ActionResult> DeleteColor(int id)
        {
            var color = await _unitOfWork.Repository<Color>().GetByIdAsync(id);

            foreach (var photo in color.Photos)
            {
                _photoService.DeleteFromDiskColor(photo);
            }

            _unitOfWork.Repository<Color>().Delete(color);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting color"));

            return Ok();
        }

        [HttpPut("colors/{id}/photo")]
        public async Task<ActionResult<ColorToReturnDto>> AddColorPhoto(int id, [FromForm] ProductPhotoDto photoDto)
        {
            var spec = new ColorsWithPhotosSpecification(id);
            var color = await _unitOfWork.Repository<Color>().GetEntityWithSpec(spec);

            if (photoDto.Photo.Length > 0)
            {
                var photo = await _photoService.SaveToDiskAsyncColor(photoDto.Photo);

                if (photo != null)
                {
                    color.AddPhoto(photo.PictureUrl, photo.FileName);

                    _unitOfWork.Repository<Color>().Update(color);

                    var result = await _unitOfWork.Complete();

                    if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding color photo"));
                }
                else
                {
                    return BadRequest(new ApiResponse(400, "Problem saving color photo to disk"));
                }
            }

            return _mapper.Map<Color, ColorToReturnDto>(color);
        }

        [HttpDelete("colors/{id}/photo/{photoId}")]
        public async Task<ActionResult> DeleteColorPhoto(int id, int photoId)
        {
            var spec = new ColorsWithPhotosSpecification(id);
            var color = await _unitOfWork.Repository<Color>().GetEntityWithSpec(spec);

            var photo = color.Photos.SingleOrDefault(x => x.Id == photoId);

            if (photo != null)
            {
                if (photo.IsMain)
                    return BadRequest(new ApiResponse(400,
                        "You cannot delete the main photo"));

                _photoService.DeleteFromDiskColor(photo);
            }
            else
            {
                return BadRequest(new ApiResponse(400, "Photo does not exist"));
            }

            color.RemovePhoto(photoId);

            _unitOfWork.Repository<Color>().Update(color);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting color photo"));

            return Ok();
        }

        [HttpPost("colors/{id}/photo/{photoId}")]
        public async Task<ActionResult<ColorToReturnDto>> SetMainPhotoColor(int id, int photoId)
        {
            var spec = new ColorsWithPhotosSpecification(id);
            var color = await _unitOfWork.Repository<Color>().GetEntityWithSpec(spec);

            if (color.Photos.All(x => x.Id != photoId)) return NotFound();

            color.SetMainPhoto(photoId);

            _unitOfWork.Repository<Color>().Update(color);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding color photo"));

            return _mapper.Map<Color, ColorToReturnDto>(color);
        }

        [HttpGet("hardwares")]
        public async Task<ActionResult<IReadOnlyList<Hardware>>> GetHardwares([FromQuery] HardwareSpecParams hardwareParams)
        {
            var spec = new HardwaresWithTypesAndMaterialsAndColors(hardwareParams);

            var countSpec = new HardwaresWithTypesAndMaterialsAndColors(hardwareParams);
            var totalItems = await _unitOfWork.Repository<Hardware>().CountAsync(countSpec);

            var hardwares = await _unitOfWork.Repository<Hardware>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Hardware>, IReadOnlyList<HardwareToReturnDto>>(hardwares);

            return Ok(new Pagination<HardwareToReturnDto>(hardwareParams.PageIndex, hardwareParams.PageSize, totalItems, data));
        }

        [HttpGet("hardwares/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HardwareToReturnDto>> GetHardware(int id)
        {
            var spec = new HardwaresWithTypesAndMaterialsAndColors(id);

            var hardware = await _unitOfWork.Repository<Hardware>().GetEntityWithSpec(spec);
            if (hardware == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Hardware, HardwareToReturnDto>(hardware);
        }

        [HttpPost("hardwares")]
        public async Task<ActionResult<HardwareToReturnDto>> CreateHardware(HardwareToCreateDto hardwareToCreate)
        {
            var hardware = _mapper.Map<HardwareToCreateDto, Hardware>(hardwareToCreate);

            _unitOfWork.Repository<Hardware>().Add(hardware);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating hardware"));

            return Ok(hardware);
        }

        [HttpPut("hardwares/{id}")]
        public async Task<ActionResult> UpdateHardware(int id, HardwareToCreateDto hardwareToUpdate)
        {
            var hardware = await _unitOfWork.Repository<Hardware>().GetByIdAsync(id);

            _mapper.Map(hardwareToUpdate, hardware);

            _unitOfWork.Repository<Hardware>().Update(hardware);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating hardware"));

            return Ok(hardware);
        }

        [HttpDelete("hardwares/{id}")]
        public async Task<ActionResult> DeleteHardware(int id)
        {
            var hardware = await _unitOfWork.Repository<Hardware>().GetByIdAsync(id);

            _unitOfWork.Repository<Hardware>().Delete(hardware);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting hardware"));

            return Ok();
        }

        [HttpGet("materials")]
        public async Task<ActionResult<IReadOnlyList<Material>>> GetMaterials([FromQuery] MaterialSpecParams materialParams)
        {
            var spec = new MaterialsWithColorsAndTypesSpecification(materialParams);

            var countSpec = new MaterialsWithColorsAndTypesSpecification(materialParams);
            var totalItems = await _unitOfWork.Repository<Material>().CountAsync(countSpec);

            var materials = await _unitOfWork.Repository<Material>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Material>, IReadOnlyList<MaterialToReturnDto>>(materials);

            return Ok(new Pagination<MaterialToReturnDto>(materialParams.PageIndex, materialParams.PageSize, totalItems, data));
        }

        [HttpGet("materials/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MaterialToReturnDto>> GetMaterial(int id)
        {
            var spec = new MaterialsWithColorsAndTypesSpecification(id);

            var material = await _unitOfWork.Repository<Material>().GetEntityWithSpec(spec);
            if (material == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Material, MaterialToReturnDto>(material);
        }

        [HttpPost("materials")]
        public async Task<ActionResult<MaterialToReturnDto>> CreateMaterial(MaterialToCreateDto materialToCreate)
        {
            var material = _mapper.Map<MaterialToCreateDto, Material>(materialToCreate);

            _unitOfWork.Repository<Material>().Add(material);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating material"));

            return Ok(material);
        }

        [HttpPut("materials/{id}")]
        public async Task<ActionResult> UpdateMaterial(int id, MaterialToCreateDto materialToUpdate)
        {
            var material = await _unitOfWork.Repository<Material>().GetByIdAsync(id);

            _mapper.Map(materialToUpdate, material);

            _unitOfWork.Repository<Material>().Update(material);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating material"));

            return Ok(material);
        }

        [HttpDelete("materials/{id}")]
        public async Task<ActionResult> DeleteMaterial(int id)
        {
            var material = await _unitOfWork.Repository<Material>().GetByIdAsync(id);

            _unitOfWork.Repository<Material>().Delete(material);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting material"));

            return Ok();
        }

        [HttpGet("stockmaterials")]
        public async Task<ActionResult<IReadOnlyList<StockMaterial>>> GetStockMaterials([FromQuery] StockmaterialSpecParams stockmaterialParams)
        {
            var spec = new StockMaterialsWithMaterialDetailsSpecification(stockmaterialParams);

            var countSpec = new StockMaterialsWithMaterialDetailsSpecification(stockmaterialParams);
            var totalItems = await _unitOfWork.Repository<StockMaterial>().CountAsync(countSpec);

            var stockmaterials = await _unitOfWork.Repository<StockMaterial>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<StockMaterial>, IReadOnlyList<StockmaterialToReturnDto>>(stockmaterials);

            return Ok(new Pagination<StockmaterialToReturnDto>(stockmaterialParams.PageIndex, stockmaterialParams.PageSize, totalItems, data));
        }

        [HttpGet("stockmaterials/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StockmaterialToReturnDto>> GetStockMaterial(int id)
        {
            var spec = new StockMaterialsWithMaterialDetailsSpecification(id);

            var stockmaterial = await _unitOfWork.Repository<StockMaterial>().GetEntityWithSpec(spec);
            if (stockmaterial == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<StockMaterial, StockmaterialToReturnDto>(stockmaterial);
        }

        [HttpPost("stockmaterials")]
        public async Task<ActionResult<StockmaterialToReturnDto>> CreateStockMaterial(StockMaterialToCreateDto stockmaterialToCreate)
        {
            var stockmaterial = _mapper.Map<StockMaterialToCreateDto, StockMaterial>(stockmaterialToCreate);

            _unitOfWork.Repository<StockMaterial>().Add(stockmaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating stockmaterial"));

            return Ok(stockmaterial);
        }

        [HttpPut("stockmaterials/{id}")]
        public async Task<ActionResult> UpdateStockMaterial(int id, StockMaterialToCreateDto stockmaterialToUpdate)
        {
            var stockmaterial = await _unitOfWork.Repository<StockMaterial>().GetByIdAsync(id);

            _mapper.Map(stockmaterialToUpdate, stockmaterial);

            _unitOfWork.Repository<StockMaterial>().Update(stockmaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating stockmaterial"));

            return Ok(stockmaterial);
        }

        [HttpDelete("stockmaterials/{id}")]
        public async Task<ActionResult> DeleteStockMaterial(int id)
        {
            var stockmaterial = await _unitOfWork.Repository<StockMaterial>().GetByIdAsync(id);

            _unitOfWork.Repository<StockMaterial>().Delete(stockmaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting stockmaterial"));

            return Ok();
        }

        [HttpGet("materialtypes")]
        public async Task<ActionResult<IReadOnlyList<MaterialType>>> GetMaterialTypes()
        {
            return Ok(await _unitOfWork.Repository<MaterialType>().ListAllAsync());
        }

        [HttpPost("materialtypes")]
        public async Task<ActionResult<ProductType>> CreateMaterialType(MaterialTypeToCreateDto materialTypeToCreate)
        {
            var materialType = _mapper.Map<MaterialTypeToCreateDto, MaterialType>(materialTypeToCreate);

            _unitOfWork.Repository<MaterialType>().Add(materialType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating materialType"));

            return Ok(materialType);
        }

        [HttpGet("materialtypes/{id}")]
        public async Task<ActionResult<MaterialType>> GetMaterialType([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<MaterialType>().GetByIdAsync(id));
        }

        [HttpPut("materialtypes/{id}")]
        public async Task<ActionResult<MaterialType>> UpdateMaterialType(int id, MaterialTypeToCreateDto materialTypeToUpdate)
        {
            var materialType = await _unitOfWork.Repository<MaterialType>().GetByIdAsync(id);

            _mapper.Map(materialTypeToUpdate, materialType);

            _unitOfWork.Repository<MaterialType>().Update(materialType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating material type"));

            return Ok(materialType);
        }

        [HttpDelete("materialtypes/{id}")]
        public async Task<ActionResult> DeleteMaterialType(int id)
        {
            var materialType = await _unitOfWork.Repository<MaterialType>().GetByIdAsync(id);

            _unitOfWork.Repository<MaterialType>().Delete(materialType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting material type"));

            return Ok();
        }

        [HttpGet("hardwaretypes")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareTypes()
        {
            return Ok(await _unitOfWork.Repository<HardwareType>().ListAllAsync());
        }

        [HttpPost("hardwaretypes")]
        public async Task<ActionResult<HardwareType>> CreateHardwareType(HardwareTypeToCreateDto hardwareTypeToCreate)
        {
            var hardwareType = _mapper.Map<HardwareTypeToCreateDto, HardwareType>(hardwareTypeToCreate);

            _unitOfWork.Repository<HardwareType>().Add(hardwareType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating hardwareType"));

            return Ok(hardwareType);
        }

        [HttpGet("hardwaretypes/{id}")]
        public async Task<ActionResult<HardwareType>> GetHardwareType([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<HardwareType>().GetByIdAsync(id));
        }

        [HttpPut("hardwaretypes/{id}")]
        public async Task<ActionResult<HardwareType>> UpdateHardwareType(int id, HardwareTypeToCreateDto hardwareTypeToUpdate)
        {
            var hardwareType = await _unitOfWork.Repository<HardwareType>().GetByIdAsync(id);

            _mapper.Map(hardwareTypeToUpdate, hardwareType);

            _unitOfWork.Repository<HardwareType>().Update(hardwareType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating hardware type"));

            return Ok(hardwareType);
        }

        [HttpDelete("hardwaretypes/{id}")]
        public async Task<ActionResult> DeleteHardwareType(int id)
        {
            var hardwareType = await _unitOfWork.Repository<HardwareType>().GetByIdAsync(id);

            _unitOfWork.Repository<HardwareType>().Delete(hardwareType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting hardware type"));

            return Ok();
        }

        [HttpGet("hardwarematerials")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareMaterials()
        {
            return Ok(await _unitOfWork.Repository<HardwareMaterial>().ListAllAsync());
        }

                [HttpPost("hardwarematerials")]
        public async Task<ActionResult<HardwareMaterial>> CreateHardwareMaterial(HardwareMaterialToCreateDto hardwareMaterialToCreate)
        {
            var hardwareMaterial = _mapper.Map<HardwareMaterialToCreateDto, HardwareMaterial>(hardwareMaterialToCreate);

            _unitOfWork.Repository<HardwareMaterial>().Add(hardwareMaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating hardwareMaterial"));

            return Ok(hardwareMaterial);
        }

        [HttpGet("hardwarematerials/{id}")]
        public async Task<ActionResult<HardwareMaterial>> GetHardwareMaterial([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<HardwareMaterial>().GetByIdAsync(id));
        }

        [HttpPut("hardwarematerials/{id}")]
        public async Task<ActionResult<HardwareMaterial>> UpdateHardwareMaterial(int id, HardwareMaterialToCreateDto hardwareMaterialToUpdate)
        {
            var hardwareMaterial = await _unitOfWork.Repository<HardwareMaterial>().GetByIdAsync(id);

            _mapper.Map(hardwareMaterialToUpdate, hardwareMaterial);

            _unitOfWork.Repository<HardwareMaterial>().Update(hardwareMaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating hardware Material"));

            return Ok(hardwareMaterial);
        }

        [HttpDelete("hardwarematerials/{id}")]
        public async Task<ActionResult> DeleteHardwareMaterial(int id)
        {
            var hardwareMaterial = await _unitOfWork.Repository<HardwareMaterial>().GetByIdAsync(id);

            _unitOfWork.Repository<HardwareMaterial>().Delete(hardwareMaterial);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting hardware Material"));

            return Ok();
        }

        [HttpGet("hardwarecolors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareColors()
        {
            return Ok(await _unitOfWork.Repository<HardwareColor>().ListAllAsync());
        }

        [HttpPost("hardwarecolors")]
        public async Task<ActionResult<HardwareColor>> CreateHardwareColor(HardwareColorToCreateDto hardwareColorToCreate)
        {
            var hardwareColor = _mapper.Map<HardwareColorToCreateDto, HardwareColor>(hardwareColorToCreate);

            _unitOfWork.Repository<HardwareColor>().Add(hardwareColor);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating hardwareColor"));

            return Ok(hardwareColor);
        }

        [HttpGet("hardwarecolors/{id}")]
        public async Task<ActionResult<HardwareColor>> GetHardwareColor([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<HardwareColor>().GetByIdAsync(id));
        }

        [HttpPut("hardwarecolors/{id}")]
        public async Task<ActionResult<HardwareColor>> UpdateHardwareColor(int id, HardwareColorToCreateDto hardwareColorToUpdate)
        {
            var hardwareColor = await _unitOfWork.Repository<HardwareColor>().GetByIdAsync(id);

            _mapper.Map(hardwareColorToUpdate, hardwareColor);

            _unitOfWork.Repository<HardwareColor>().Update(hardwareColor);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating hardware Color"));

            return Ok(hardwareColor);
        }

        [HttpDelete("hardwarecolors/{id}")]
        public async Task<ActionResult> DeleteHardwareColor(int id)
        {
            var hardwareColor = await _unitOfWork.Repository<HardwareColor>().GetByIdAsync(id);

            _unitOfWork.Repository<HardwareColor>().Delete(hardwareColor);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting hardware Color"));

            return Ok();
        }
    }
}