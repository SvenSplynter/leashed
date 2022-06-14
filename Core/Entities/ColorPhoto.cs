namespace Core.Entities
{
    public class ColorPhoto : BaseEntity
    {
        public string PictureUrl { get; set; }
        public string FileName { get; set; }
        public bool IsMain { get; set; }
        public Color Color { get; set; }
        public int ColorId { get; set; }
    }
}