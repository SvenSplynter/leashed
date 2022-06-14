using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class StockMaterialUrlResolver : IValueResolver<StockMaterial, StockmaterialToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public StockMaterialUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(StockMaterial source, StockmaterialToReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Material.Color.Photos.FirstOrDefault(x => x.IsMain);

            if(photo !=null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }
            
            return _config["ApiUrl"] + "images/placeholder.jpg";
        }
    }
}