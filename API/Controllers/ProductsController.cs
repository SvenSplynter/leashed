using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _repo.GetProductsAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _repo.GetProductByIdAsync(id);
        }

        [HttpGet("colors")]
        public async Task<ActionResult<IReadOnlyList<Color>>> GetColors()
        {
            return Ok(await _repo.GetColorsAsync());
        }

        [HttpGet("hardwares")]
        public async Task<ActionResult<IReadOnlyList<Hardware>>> GetHardwares()
        {
            return Ok(await _repo.GetHardwaresAsync());
        }

        [HttpGet("materials")]
        public async Task<ActionResult<IReadOnlyList<Material>>> GetMaterials()
        {
            return Ok(await _repo.GetMaterialsAsync());
        }

        [HttpGet("stockmaterials")]
        public async Task<ActionResult<IReadOnlyList<StockMaterial>>> GetStockMaterials()
        {
            return Ok(await _repo.GetStockMaterialsAsync());
        }
    }
}