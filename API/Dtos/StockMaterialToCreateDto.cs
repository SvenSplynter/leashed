using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class StockMaterialToCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int MaterialId { get; set; }
        [Required]
        public int Thickness { get; set; }
        [Required]
        public int ColorId { get; set; }
        [Required]
        public decimal MeterInStock { get; set; }
    }
}