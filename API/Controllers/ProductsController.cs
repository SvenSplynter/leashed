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

        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
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