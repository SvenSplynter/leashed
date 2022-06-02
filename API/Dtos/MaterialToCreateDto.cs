using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class MaterialToCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int MaterialTypeId { get; set; }
        [Required]
        public int Thickness { get; set; }
        [Required]
        public int ColorId { get; set; }
        [Required]
        public decimal PricePerMeter { get; set; }
    }
}