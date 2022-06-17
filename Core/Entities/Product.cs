namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string PublicName { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public decimal Length { get; set; }
        public Material Material { get; set; }
        public int MaterialId { get; set; }
        public string Finishing { get; set; }
        public Material FinishMaterial1 { get; set; }
        public int FinishMaterial1Id { get; set; }
        public Material FinishMaterial2 { get; set; }
        public int FinishMaterial2Id { get; set; }
        public Material FinishMaterial3 { get; set; }
        public int FinishMaterial3Id { get; set; }
        public Hardware Hook1 { get; set; }
        public int Hook1Id { get; set; }
        public Hardware Hook2 { get; set; }
        public int Hook2Id { get; set; }
        public Hardware ORing1 { get; set; }
        public int ORing1Id { get; set; }
        public Hardware ORing2 { get; set; }
        public int ORing2Id { get; set; }
        public Hardware StopBar { get; set; }
        public int StopBarId { get; set; }
        public Hardware Keychain { get; set; }
        public int KeychainId { get; set; }
        public Hardware EndCaps { get; set; }
        public int EndCapsId { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string Description { get; set; }
        public string LastUpdated { get; set; }
        private readonly List<Photo> _photos = new List<Photo>();
        public IReadOnlyList<Photo> Photos => _photos.AsReadOnly();

        public void AddPhoto(string pictureUrl, string fileName, bool isMain = false)
        {
            var photo = new Photo
            {
                FileName = fileName,
                PictureUrl = pictureUrl
            };

            if (_photos.Count == 0) photo.IsMain = true;

            _photos.Add(photo);
        }

        public void RemovePhoto(int id)
        {
            var photo = _photos.Find(x => x.Id == id);
            _photos.Remove(photo);
        }

        public void SetMainPhoto(int id)
        {
            var currentMain = _photos.SingleOrDefault(item => item.IsMain);
            foreach (var item in _photos.Where(item => item.IsMain))
            {
                item.IsMain = false;
            }

            var photo = _photos.Find(x => x.Id == id);
            if (photo != null)
            {
                photo.IsMain = true;
                if (currentMain != null) currentMain.IsMain = false;
            }
        }



    }
}