namespace Core.Entities
{
    public class Hardware : BaseEntity
    {
        public string Name { get; set; }
        public HardwareType HardwareType { get; set; }
        public int HardwareTypeId { get; set; }
        public int Size { get; set; }
        public HardwareMaterial HardwareMaterial { get; set; }
        public int HardwareMaterialId { get; set; }
        public HardwareColor HardwareColor { get; set; }
        public int HardwareColorId { get; set; }
        public int InStock { get; set; }
        public int Ordered { get; set; }
        public decimal Price { get; set; }
    }
}