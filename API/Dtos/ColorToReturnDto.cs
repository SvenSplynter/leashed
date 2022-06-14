namespace API.Dtos
{
    public class ColorToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MainColor { get; set; }
        public string PictureUrl { get; set; }
        public IEnumerable<PhotoToReturnDto> Photos { get; set; }
    }
}