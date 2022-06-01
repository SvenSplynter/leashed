using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithMaterialsAndHardwaresSpecification : BaseSpecification<Product>
    {
        public ProductsWithMaterialsAndHardwaresSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (!productParams.Size.HasValue || x.Material.Thickness == productParams.Size)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.Material);
            AddInclude("Material.Color");
            AddInclude(x => x.FinishMaterial1);
            AddInclude("FinishMaterial1.Color");
            AddInclude(x => x.FinishMaterial2);
            AddInclude("FinishMaterial2.Color");
            AddInclude(x => x.FinishMaterial3);
            AddInclude("FinishMaterial3.Color");
            AddInclude(x => x.Hook1);
            AddInclude(x => x.Hook2);
            AddInclude(x => x.ORing1);
            AddInclude(x => x.ORing2);
            AddInclude(x => x.Keychain);
            AddInclude(x => x.EndCaps);
            AddInclude(x => x.StopBar);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort)) 
            {
                switch(productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithMaterialsAndHardwaresSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.Material);
            AddInclude("Material.Color");
            AddInclude(x => x.FinishMaterial1);
            AddInclude("FinishMaterial1.Color");
            AddInclude(x => x.FinishMaterial2);
            AddInclude("FinishMaterial2.Color");
            AddInclude(x => x.FinishMaterial3);
            AddInclude("FinishMaterial3.Color");
            AddInclude(x => x.Hook1);
            AddInclude(x => x.Hook2);
            AddInclude(x => x.ORing1);
            AddInclude(x => x.ORing2);
            AddInclude(x => x.Keychain);
            AddInclude(x => x.EndCaps);
            AddInclude(x => x.StopBar);
        }
    }
}