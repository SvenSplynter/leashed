namespace API.Dtos
{
    public class MaterialToReturnDto
    {
        public int Id { get; set; }         
        public string Name { get; set; }
        public string MaterialType { get; set; }
        public int MaterialTypeId { get; set; }
        public int Thickness { get; set; }
        public string MainColor { get; set; }
        public string Color { get; set; }
        public int ColorId { get; set; }
        public string PictureUrl { get; set; }
        public decimal PricePerMeter { get; set; }
        public IEnumerable<PhotoToReturnDto> photos { get; set; }
    }
}