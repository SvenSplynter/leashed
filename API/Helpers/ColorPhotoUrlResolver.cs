using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class ColorPhotoUrlResolver : IValueResolver<ColorPhoto, PhotoToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ColorPhotoUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(ColorPhoto source, PhotoToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }
            
            return null;
        }
    }
}