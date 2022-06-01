namespace API.Dtos
{
    public class MaterialToReturnDto
    {
        public int Id { get; set; }         
        public string Name { get; set; }
        public string MaterialType { get; set; }
        public int Thickness { get; set; }
        public string Color { get; set; }
        public int ColorId { get; set; }
        public decimal PricePerMeter { get; set; }
    }
}