using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Color>> GetColorsAsync()
        {
            return await _context.Colors.ToListAsync();
        }

        public async Task<IReadOnlyList<Hardware>> GetHardwaresAsync()
        {
            return await _context.Hardwares.ToListAsync();
        }

        public async Task<IReadOnlyList<Material>> GetMaterialsAsync()
        {
            return await _context.Materials
                .Include(p => p.Color)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Material)
                .Include(p => p.FinishMaterial1)
                .Include(p => p.FinishMaterial2)
                .Include(p => p.FinishMaterial3)
                .Include(p => p.Hook)
                .Include(p => p.ORing)
                .Include(p => p.StopBar)
                .Include(p => p.Keychain)
                .Include(p => p.EndCaps)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Material)
                .Include(p => p.FinishMaterial1)
                .Include(p => p.FinishMaterial2)
                .Include(p => p.FinishMaterial3)
                .Include(p => p.Hook)
                .Include(p => p.ORing)
                .Include(p => p.StopBar)
                .Include(p => p.Keychain)
                .Include(p => p.EndCaps)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<StockMaterial>> GetStockMaterialsAsync()
        {
            return await _context.StockMaterials
                .Include(p => p.Material)
                .ToListAsync();
        }
    }
}