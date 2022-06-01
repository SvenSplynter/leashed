namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProductType { get; set; }
        public decimal Length { get; set; }
        public string Material { get; set; }
        public string Color { get; set; }
        public int Size { get; set; }
        public string Finishing { get; set; }
        public string FinishMaterial1 { get; set; }
        public string FinishMaterial2 { get; set; }
        public string FinishMaterial3 { get; set; }
        public string Hook1 { get; set; }
        public string Hook2 { get; set; }
        public string ORing1 { get; set; }
        public string ORing2 { get; set; }
        public string StopBar { get; set; }
        public string Keychain { get; set; }
        public string EndCaps { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string PictureUrl { get; set; }
        public string LastUpdated { get; set; }
    }
}