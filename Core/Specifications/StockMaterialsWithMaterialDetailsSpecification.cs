using Core.Entities;

namespace Core.Specifications
{
    public class StockMaterialsWithMaterialDetailsSpecification : BaseSpecification<StockMaterial>
    {
        public StockMaterialsWithMaterialDetailsSpecification(StockmaterialSpecParams stockmaterialParams)
            : base(x =>
                (string.IsNullOrEmpty(stockmaterialParams.Search) || x.Name.ToLower().Contains(stockmaterialParams.Search)) &&
                (!stockmaterialParams.ColorId.HasValue || x.Material.ColorId == stockmaterialParams.ColorId) &&
                (!stockmaterialParams.Thickness.HasValue || x.Material.Thickness == stockmaterialParams.Thickness)

            )
        {
            AddInclude(x => x.Material);
            AddInclude("Material.MaterialType");
            AddInclude("Material.Color");
            AddInclude("Material.Color.Photos");
            AddOrderBy(x => x.Name);
            ApplyPaging(stockmaterialParams.PageSize * (stockmaterialParams.PageIndex - 1), stockmaterialParams.PageSize);

            if (!string.IsNullOrEmpty(stockmaterialParams.Sort))
            {
                switch (stockmaterialParams.Sort)
                {
                    case "thicknessAsc":
                        AddOrderBy(p => p.Material.Thickness);
                        break;
                    case "thicknessDesc":
                        AddOrderByDescending(p => p.Material.Thickness);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public StockMaterialsWithMaterialDetailsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Material);
            AddInclude("Material.MaterialType");
            AddInclude("Material.Color");
            AddInclude("Material.Color.Photos");
        }
    }
}