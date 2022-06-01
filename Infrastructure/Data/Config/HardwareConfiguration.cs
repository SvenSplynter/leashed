using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class HardwareConfiguration : IEntityTypeConfiguration<Hardware>
    {
        public void Configure(EntityTypeBuilder<Hardware> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.HardwareTypeId).IsRequired();
            builder.Property(p => p.HardwareMaterialId).IsRequired();
            builder.Property(p => p.HardwareColorId).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
        }
    }
}