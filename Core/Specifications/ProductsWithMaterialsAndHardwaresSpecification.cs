using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithMaterialsAndHardwaresSpecification : BaseSpecification<Product>
    {
        public ProductsWithMaterialsAndHardwaresSpecification()
        {
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

        public ProductsWithMaterialsAndHardwaresSpecification(int id) : base(x => x.Id == id)
        {
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