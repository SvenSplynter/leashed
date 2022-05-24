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
        private readonly IGenericRepository<Material> _materialsRepo;
        private readonly IGenericRepository<StockMaterial> _stockmaterialsRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
                                  IGenericRepository<ProductType> producttypesRepo,
                                  IGenericRepository<Color> colorsRepo,
                                  IGenericRepository<Hardware> hardwaresRepo,
                                  IGenericRepository<Material> materialsRepo,
                                  IGenericRepository<StockMaterial> stockmaterialsRepo,
                                  IMapper mapper)
        {
            _productsRepo = productsRepo;
            _producttypesRepo = producttypesRepo;
            _colorsRepo = colorsRepo;
            _hardwaresRepo = hardwaresRepo;
            _materialsRepo = materialsRepo;
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
        public async Task<ActionResult<IReadOnlyList<Hardware>>> GetHardwares()
        {
            return Ok(await _hardwaresRepo.ListAllAsync());
        }

        [HttpGet("materials")]
        public async Task<ActionResult<IReadOnlyList<Material>>> GetMaterials()
        {
            var spec = new MaterialsWithColorsSpecification();

            return Ok(await _materialsRepo.ListAsync(spec));
        }

        [HttpGet("stockmaterials")]
        public async Task<ActionResult<IReadOnlyList<StockMaterial>>> GetStockMaterials()
        {
            var spec = new StockMaterialsWithMaterialDetailsSpecification();
            return Ok(await _stockmaterialsRepo.ListAsync(spec));
        }
    }
}