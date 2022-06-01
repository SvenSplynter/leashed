using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class HardwareMaterialConfiguration : IEntityTypeConfiguration<HardwareMaterial>
    {
        public void Configure(EntityTypeBuilder<HardwareMaterial> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(100);
        }
    }
}