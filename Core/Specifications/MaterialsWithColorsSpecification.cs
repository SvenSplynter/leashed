using Core.Entities;

namespace Core.Specifications
{
    public class MaterialsWithColorsSpecification : BaseSpecification<Material>
    {
        public MaterialsWithColorsSpecification()
        {
            AddInclude(x => x.Color);
        }
    }
}