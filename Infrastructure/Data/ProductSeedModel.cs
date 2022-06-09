namespace Infrastructure.Data
{
    public class ProductSeedModel
    {
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public decimal Length { get; set; }
        public int MaterialId { get; set; }
        public string Finishing { get; set; }
        public int FinishMaterial1Id { get; set; }
        public int FinishMaterial2Id { get; set; }
        public int FinishMaterial3Id { get; set; }
        public int Hook1Id { get; set; }
        public int Hook2Id { get; set; }
        public int ORing1Id { get; set; }
        public int ORing2Id { get; set; }
        public int StopBarId { get; set; }
        public int KeychainId { get; set; }
        public int EndCapsId { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string LastUpdated { get; set; }
        public string PictureUrl { get; set; }
    }
}