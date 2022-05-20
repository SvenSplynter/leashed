using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<Hardware>> GetHardwaresAsync();
        Task<IReadOnlyList<Material>> GetMaterialsAsync();
        Task<IReadOnlyList<StockMaterial>> GetStockMaterialsAsync();
        Task<IReadOnlyList<Color>> GetColorsAsync();
    }
}