using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.Material, o => o.MapFrom(s => s.Material.Name))
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
        }
    }
}