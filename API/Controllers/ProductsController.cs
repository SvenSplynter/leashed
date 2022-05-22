using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<Color> _colorsRepo;
        private readonly IGenericRepository<Hardware> _hardwaresRepo;
        private readonly IGenericRepository<Material> _materialsRepo;
        private readonly IGenericRepository<StockMaterial> _stockmaterialsRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
                                  IGenericRepository<Color> colorsRepo,
                                  IGenericRepository<Hardware> hardwaresRepo,
                                  IGenericRepository<Material> materialsRepo,
                                  IGenericRepository<StockMaterial> stockmaterialsRepo,
                                  IMapper mapper)
        {
            _productsRepo = productsRepo;
            _colorsRepo = colorsRepo;
            _hardwaresRepo = hardwaresRepo;
            _materialsRepo = materialsRepo;
            _stockmaterialsRepo = stockmaterialsRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification();

            var products = await _productsRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithMaterialsAndHardwaresSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            // return new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Type = product.Type,
            //     Material = product.Material.Name,
            //     Finishing = product.Finishing,
            //     FinishMaterial1 = product.FinishMaterial1.Color.Name,
            //     FinishMaterial2 = product.FinishMaterial2.Color.Name,
            //     FinishMaterial3 = product.FinishMaterial3.Color.Name,
            //     Hook = product.Hook.Name,
            //     ORing = product.ORing.Name,
            //     StopBar = product.StopBar.Name,
            //     Keychain = product.Keychain.Name,
            //     EndCaps = product.EndCaps.Name,
            //     Price = product.Price,
            //     InStock = product.InStock,
            //     PictureUrl = product.PictureUrl
            // };

            return _mapper.Map<Product, ProductToReturnDto>(product);


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