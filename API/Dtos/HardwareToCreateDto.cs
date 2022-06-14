using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class HardwareToCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int HardwareTypeId { get; set; }
        [Required]
        public int Size { get; set; }
        [Required]
        public int HardwareMaterialId { get; set; }
        [Required]
        public int HardwareColorId { get; set; }
        [Required]
        public int InStock { get; set; }
        [Required]
        public int Ordered { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}