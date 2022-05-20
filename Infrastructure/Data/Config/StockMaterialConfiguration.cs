using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class StockMaterialConfiguration : IEntityTypeConfiguration<StockMaterial>
    {
        public void Configure(EntityTypeBuilder<StockMaterial> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.MeterInStock).HasColumnType("decimal(18,2)");
        }
    }
}