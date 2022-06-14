using Core.Entities;

namespace Core.Specifications;
    public class ColorsWithPhotosSpecification : BaseSpecification<Color> {

    public ColorsWithPhotosSpecification(ColorSpecParams colorParams)
        : base(x => 
            (string.IsNullOrEmpty(colorParams.Search) || x.Name.ToLower().Contains(colorParams.Search))
        )
    {
        AddInclude(x => x.Photos);
        AddOrderBy(x => x.MainColor);
    }

    public ColorsWithPhotosSpecification(int id)
        : base(x => x.Id == id)
    {
        AddInclude(x => x.Photos);
    }
}