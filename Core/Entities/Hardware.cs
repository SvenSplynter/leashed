namespace Core.Entities
{
    public class Hardware : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Size { get; set; }
        public string Material { get; set; }
        public string Color { get; set; }
        public int InStock { get; set; }
        public int Ordered { get; set; }
        public decimal Price { get; set; }
    }
}