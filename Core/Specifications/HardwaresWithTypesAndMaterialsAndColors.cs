using Core.Entities;

namespace Core.Specifications
{
    public class HardwaresWithTypesAndMaterialsAndColors : BaseSpecification<Hardware>
    {
        public HardwaresWithTypesAndMaterialsAndColors(HardwareSpecParams hardwareParams)
            : base(x => 
                (string.IsNullOrEmpty(hardwareParams.Search) || x.Name.ToLower().Contains(hardwareParams.Search)) &&
                (!hardwareParams.HardwareTypeId.HasValue || x.HardwareTypeId == hardwareParams.HardwareTypeId) &&
                (!hardwareParams.HardwareMaterialId.HasValue || x.HardwareMaterialId == hardwareParams.HardwareMaterialId) &&
                (!hardwareParams.HardwareColorId.HasValue || x.HardwareColorId == hardwareParams.HardwareColorId)
            )
        {
            AddInclude(x => x.HardwareType);
            AddInclude(x => x.HardwareMaterial);
            AddInclude(x => x.HardwareColor);
            AddOrderBy(x => x.Name);
            ApplyPaging(hardwareParams.PageSize * (hardwareParams.PageIndex - 1), hardwareParams.PageSize);

            if(!string.IsNullOrEmpty(hardwareParams.Sort)) 
            {
                switch(hardwareParams.Sort)
                {
                    case "inStockAsc":
                        AddOrderBy(p => p.InStock);
                        break;
                    case "inStockDesc":
                        AddOrderByDescending(p => p.InStock);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }
    }
}