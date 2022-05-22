using Core.Entities;

namespace Core.Specifications
{
    public class StockMaterialsWithMaterialDetailsSpecification : BaseSpecification<StockMaterial>
    {
        public StockMaterialsWithMaterialDetailsSpecification()
        {
            AddInclude(x => x.Material);
            AddInclude("Material.Color");
        }
    }
}