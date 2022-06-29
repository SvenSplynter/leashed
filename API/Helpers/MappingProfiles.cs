using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.Material, o => o.MapFrom(s => s.Material.Name))
                .ForMember(d => d.Color, o => o.MapFrom(s => s.Material.Color.Name))
                .ForMember(d => d.Size, o => o.MapFrom(s => s.Material.Thickness))
                .ForMember(d => d.FinishMaterial1, o => o.MapFrom(s => s.FinishMaterial1.Color.Name))
                .ForMember(d => d.FinishMaterial2, o => o.MapFrom(s => s.FinishMaterial2.Color.Name))
                .ForMember(d => d.FinishMaterial3, o => o.MapFrom(s => s.FinishMaterial3.Color.Name))
                .ForMember(d => d.Hook1, o => o.MapFrom(s => s.Hook1.Name))
                .ForMember(d => d.Hook2, o => o.MapFrom(s => s.Hook2.Name))
                .ForMember(d => d.ORing1, o => o.MapFrom(s => s.ORing1.Name))
                .ForMember(d => d.ORing2, o => o.MapFrom(s => s.ORing2.Name))
                .ForMember(d => d.StopBar, o => o.MapFrom(s => s.StopBar.Name))
                .ForMember(d => d.Keychain, o => o.MapFrom(s => s.Keychain.Name))
                .ForMember(d => d.EndCaps, o => o.MapFrom(s => s.EndCaps.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Material, MaterialToReturnDto>()
                .ForMember(d => d.MaterialType, o => o.MapFrom(s => s.MaterialType.Name))
                .ForMember(d => d.MainColor, o => o.MapFrom(s => s.Color.MainColor))
                .ForMember(d => d.Color, o => o.MapFrom(s => s.Color.Name))
                .ForMember(d => d.photos, o => o.MapFrom(s => s.Color.Photos))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<MaterialUrlResolver>());

            CreateMap<StockMaterial, StockmaterialToReturnDto>()
                .ForMember(d => d.Material, o => o.MapFrom(s => s.Material.Name))
                .ForMember(d => d.MainColor, o => o.MapFrom(s => s.Material.Color.MainColor))
                .ForMember(d => d.Color, o => o.MapFrom(s => s.Material.Color.Name))
                .ForMember(d => d.photos, o => o.MapFrom(s => s.Material.Color.Photos))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<StockMaterialUrlResolver>())
                .ForMember(d => d.Size, o => o.MapFrom(s => s.Material.Thickness));

            CreateMap<Hardware, HardwareToReturnDto>()
                .ForMember(d => d.HardwareType, o => o.MapFrom(s => s.HardwareType.Name))
                .ForMember(d => d.HardwareMaterial, o => o.MapFrom(s => s.HardwareMaterial.Name))
                .ForMember(d => d.HardwareColor, o => o.MapFrom(s => s.HardwareColor.Name));

            CreateMap<MaterialToCreateDto, Material>();
            CreateMap<HardwareToCreateDto, Hardware>();
            CreateMap<HardwareTypeToCreateDto, HardwareType>();
            CreateMap<HardwareMaterialToCreateDto, HardwareMaterial>();
            CreateMap<HardwareColorToCreateDto, HardwareColor>();
            CreateMap<StockMaterialToCreateDto, StockMaterial>();
            CreateMap<ProductToCreateDto, Product>();
            CreateMap<ProductTypeToCreateDto, ProductType>();
            CreateMap<MaterialTypeToCreateDto, MaterialType>();

            CreateMap<Photo, PhotoToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<PhotoUrlResolver>());

            CreateMap<ColorPhoto, PhotoToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ColorPhotoUrlResolver>());

            CreateMap<Color, ColorToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ColorUrlResolver>());

            CreateMap<ColorToCreateDto, Color>();

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}