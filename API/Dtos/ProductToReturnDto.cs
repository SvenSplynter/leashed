namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public decimal Length { get; set; }
        public string Material { get; set; }
        public int MaterialId { get; set; }
        public string Color { get; set; }
        public int Size { get; set; }
        public string Finishing { get; set; }
        public string FinishMaterial1 { get; set; }
        public int FinishMaterial1Id { get; set; }
        public string FinishMaterial2 { get; set; }
        public int FinishMaterial2Id { get; set; }
        public string FinishMaterial3 { get; set; }
        public int FinishMaterial3Id { get; set; }
        public string Hook1 { get; set; }
        public int Hook1Id { get; set; }
        public string Hook2 { get; set; }
        public int Hook2Id { get; set; }
        public string ORing1 { get; set; }
        public int ORing1Id { get; set; }
        public string ORing2 { get; set; }
        public int ORing2Id { get; set; }
        public string StopBar { get; set; }
        public int StopBarId { get; set; }
        public string Keychain { get; set; }
        public int KeychainId { get; set; }
        public string EndCaps { get; set; }
        public int EndCapsId { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string LastUpdated { get; set; }
        public string PictureUrl { get; set; }
        public IEnumerable<PhotoToReturnDto> Photos { get; set; }
    }
}