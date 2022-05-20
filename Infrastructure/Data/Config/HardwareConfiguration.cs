using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            builder.Property(p => p.Type).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Material).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Color).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
        }
    }
}