namespace API.Dtos
{
    public class HardwareToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HardwareType { get; set; }
        public int Size { get; set; }
        public string HardwareMaterial { get; set; }
        public string HardwareColor { get; set; }
        public int InStock { get; set; }
        public int Ordered { get; set; }
        public decimal Price { get; set; }
    }
}