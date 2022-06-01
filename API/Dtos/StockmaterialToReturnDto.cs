namespace API.Dtos
{
    public class StockmaterialToReturnDto
    {
        public int Id { get; set; }         
        public string Name { get; set; }
        public string Material { get; set; }
        public string Color { get; set; }
        public int Size { get; set; }
        public decimal MeterInStock { get; set; }
    }
}