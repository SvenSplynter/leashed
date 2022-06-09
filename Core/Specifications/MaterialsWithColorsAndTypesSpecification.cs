using Core.Entities;

namespace Core.Specifications
{
    public class MaterialsWithColorsAndTypesSpecification : BaseSpecification<Material>
    {
        public MaterialsWithColorsAndTypesSpecification(MaterialSpecParams materialParams)
            : base(x =>
                (string.IsNullOrEmpty(materialParams.Search) || x.Name.ToLower().Contains(materialParams.Search)) &&
                (!materialParams.MaterialTypeId.HasValue || x.MaterialTypeId == materialParams.MaterialTypeId) &&
                (!materialParams.ColorId.HasValue || x.ColorId == materialParams.ColorId) &&
                (!materialParams.Thickness.HasValue || x.Thickness == materialParams.Thickness)

            )
        {
            AddInclude(x => x.MaterialType);
            AddInclude(x => x.Color);
            AddOrderBy(x => x.Name);
            ApplyPaging(materialParams.PageSize * (materialParams.PageIndex - 1), materialParams.PageSize);

            if(!string.IsNullOrEmpty(materialParams.Sort)) 
            {
                switch(materialParams.Sort)
                {
                    case "thicknessAsc":
                        AddOrderBy(p => p.Thickness);
                        break;
                    case "thicknessDesc":
                        AddOrderByDescending(p => p.Thickness);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public MaterialsWithColorsAndTypesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.MaterialType);
            AddInclude(x => x.Color);
        }
    }
}