namespace Core.Entities
{
    public class Material : BaseEntity
    {
        public string Name { get; set; }
        public MaterialType MaterialType { get; set; }
        public int MaterialTypeId { get; set; }
        public int Thickness { get; set; }
        public Color Color { get; set; }
        public int ColorId { get; set; }
        public decimal PricePerMeter { get; set; }
    }
}