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
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductType> _producttypesRepo;
        private readonly IGenericRepository<Color> _colorsRepo;
        private readonly IGenericRepository<Hardware> _hardwaresRepo;
        private readonly IGenericRepository<HardwareType> _hardwaretypesRepo;
        private readonly IGenericRepository<HardwareMaterial> _hardwarematerialsRepo;
        private readonly IGenericRepository<HardwareColor> _hardwarecolorsRepo;
        private readonly IGenericRepository<Material> _materialsRepo;
        private readonly IGenericRepository<MaterialType> _materialtypesRepo;
        private readonly IGenericRepository<StockMaterial> _stockmaterialsRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
                                  IGenericRepository<ProductType> producttypesRepo,
                                  IGenericRepository<Color> colorsRepo,
                                  IGenericRepository<Hardware> hardwaresRepo,
                                  IGenericRepository<HardwareType> hardwaretypesRepo,
                                  IGenericRepository<HardwareMaterial> hardwarematerialsRepo,
                                  IGenericRepository<HardwareColor> hardwarecolorsRepo,
                                  IGenericRepository<Material> materialsRepo,
                                  IGenericRepository<MaterialType> materialtypesRepo,
                                  IGenericRepository<StockMaterial> stockmaterialsRepo,
                                  IMapper mapper)
        {
            _productsRepo = productsRepo;
            _producttypesRepo = producttypesRepo;
            _colorsRepo = colorsRepo;
            _hardwaresRepo = hardwaresRepo;
            _hardwaretypesRepo = hardwaretypesRepo;
            _hardwarematerialsRepo = hardwarematerialsRepo;
            _hardwarecolorsRepo = hardwarecolorsRepo;
            _materialsRepo = materialsRepo;
            _materialtypesRepo = materialtypesRepo;
            _stockmaterialsRepo = stockmaterialsRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productsRepo.CountAsync(countSpec);

            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);
            if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);


        }

        [HttpGet("producttypes")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _producttypesRepo.ListAllAsync());
        }

        [HttpGet("colors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetColors()
        {
            return Ok(await _colorsRepo.ListAllAsync());
        }

        [HttpGet("hardwares")]
        public async Task<ActionResult<IReadOnlyList<Hardware>>> GetHardwares([FromQuery]HardwareSpecParams hardwareParams)
        {
            var spec = new HardwaresWithTypesAndMaterialsAndColors(hardwareParams);

            var countSpec = new HardwaresWithTypesAndMaterialsAndColors(hardwareParams);
            var totalItems = await _hardwaresRepo.CountAsync(countSpec);

            var hardwares = await _hardwaresRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Hardware>, IReadOnlyList<HardwareToReturnDto>>(hardwares);

            return Ok(new Pagination<HardwareToReturnDto>(hardwareParams.PageIndex, hardwareParams.PageSize, totalItems, data));
        }

        [HttpGet("materials")]
        public async Task<ActionResult<IReadOnlyList<Material>>> GetMaterials([FromQuery]MaterialSpecParams materialParams)
        {
            var spec = new MaterialsWithColorsAndTypesSpecification(materialParams);

            var countSpec = new MaterialsWithColorsAndTypesSpecification(materialParams);
            var totalItems = await _materialsRepo.CountAsync(countSpec);

            var materials = await _materialsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Material>, IReadOnlyList<MaterialToReturnDto>>(materials);

            return Ok(new Pagination<MaterialToReturnDto>(materialParams.PageIndex, materialParams.PageSize, totalItems, data));
        }

        [HttpGet("stockmaterials")]
        public async Task<ActionResult<IReadOnlyList<StockMaterial>>> GetStockMaterials([FromQuery]StockmaterialSpecParams stockmaterialParams)
        {
            var spec = new StockMaterialsWithMaterialDetailsSpecification(stockmaterialParams);

            var countSpec = new StockMaterialsWithMaterialDetailsSpecification(stockmaterialParams);
            var totalItems = await _stockmaterialsRepo.CountAsync(countSpec);

            var stockmaterials = await _stockmaterialsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<StockMaterial>, IReadOnlyList<StockmaterialToReturnDto>>(stockmaterials);

            return Ok(new Pagination<StockmaterialToReturnDto>(stockmaterialParams.PageIndex, stockmaterialParams.PageSize, totalItems, data));
        }

        [HttpGet("materialtypes")]
        public async Task<ActionResult<IReadOnlyList<MaterialType>>> GetMaterialTypes()
        {
            return Ok(await _materialtypesRepo.ListAllAsync());
        }

        [HttpGet("hardwaretypes")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareTypes()
        {
            return Ok(await _hardwaretypesRepo.ListAllAsync());
        }

        [HttpGet("hardwarematerials")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareMaterials()
        {
            return Ok(await _hardwarematerialsRepo.ListAllAsync());
        }

        [HttpGet("hardwarecolors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetHardwareColors()
        {
            return Ok(await _hardwarecolorsRepo.ListAllAsync());
        }
    }
}