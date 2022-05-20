namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public Material Material { get; set; }
        public int MaterialId { get; set; }
        public string Finishing { get; set; }
        public Material FinishMaterial1 { get; set; }
        public int FinishMaterial1Id { get; set; }
        public Material FinishMaterial2 { get; set; }
        public int FinishMaterial2Id { get; set; }
        public Material FinishMaterial3 { get; set; }
        public int FinishMaterial3Id { get; set; }
        public Hardware Hook { get; set; }
        public int HookId { get; set; }
        public Hardware ORing { get; set; }
        public int ORingId { get; set; }
        public Hardware StopBar { get; set; }
        public int StopBarId { get; set; }
        public Hardware Keychain { get; set; }
        public int KeychainId { get; set; }
        public Hardware EndCaps { get; set; }
        public int EndCapsId { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string PictureUrl { get; set; }
    }
}