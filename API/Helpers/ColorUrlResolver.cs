using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class ColorUrlResolver : IValueResolver<Color, ColorToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ColorUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Color source, ColorToReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Photos.FirstOrDefault(x => x.IsMain);

            if (photo != null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }

            return _config["ApiUrl"] + "images/placeholder.jpg";
        }
    }
}