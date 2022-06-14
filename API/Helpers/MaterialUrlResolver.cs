using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MaterialUrlResolver : IValueResolver<Material, MaterialToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public MaterialUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Material source, MaterialToReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Color.Photos.FirstOrDefault(x => x.IsMain);

            if(photo !=null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }
            
            return _config["ApiUrl"] + "images/placeholder.jpg";
        }
    }
}