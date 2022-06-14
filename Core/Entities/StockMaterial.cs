namespace Core.Entities
{
    public class StockMaterial : BaseEntity
    {
        public string Name { get; set; }
        public Material Material { get; set; }
        public int MaterialId { get; set; }
        public decimal MeterInStock { get; set; }
        public ColorPhoto[] photos { get; set; }
    }
}