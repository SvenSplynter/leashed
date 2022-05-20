using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class StockMaterial : BaseEntity
    {
        public string Name { get; set; }
        public Material Material { get; set; }
        public int MaterialId { get; set; }
        public decimal MeterInStock { get; set; }
    }
}