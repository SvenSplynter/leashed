using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.PublicName).IsRequired().HasMaxLength(100);
            builder.Property(p => p.ProductTypeId).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Length).HasColumnType("decimal(18,2)");
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p => p.LastUpdated).IsRequired().HasMaxLength(100);
        }
    }
}