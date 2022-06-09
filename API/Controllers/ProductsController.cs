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

        [HttpGet("producttypes/{id}")]
        public async Task<ActionResult<ProductType>> GetProductType([FromRoute] int id)
        {
            return Ok(await _unitOfWork.Repository<ProductType>().GetByIdAsync(id));
        }

        [HttpGet("colors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetColors()
        {
            return Ok(await _unitOfWork.Repository<Color>().ListAllAsync());
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

        [HttpGet("materialtypes")]
        public async Task<ActionResult<IReadOnlyList<MaterialType>>> GetMaterialTypes()
        {
            return Ok(await _unitOfWork.Repository<MaterialType>().ListAllAsync());
        }

        [HttpGet("hardwaretypes")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareTypes()
        {
            return Ok(await _unitOfWork.Repository<HardwareType>().ListAllAsync());
        }

        [HttpGet("hardwarematerials")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareMaterials()
        {
            return Ok(await _unitOfWork.Repository<HardwareMaterial>().ListAllAsync());
        }

        [HttpGet("hardwarecolors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareColors()
        {
            return Ok(await _unitOfWork.Repository<HardwareColor>().ListAllAsync());
        }
    }
}