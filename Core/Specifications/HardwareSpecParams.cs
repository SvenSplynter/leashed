namespace Core.Specifications
{
    public class HardwareSpecParams
    {
        private const int MaxPageSize = 1000;
        public int PageIndex { get; set; } = 1;
        
        private int _pageSize = 6;
        public int PageSize 
        {
            get => _pageSize; 
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value; 
        }

        public int? HardwareTypeId { get; set; }
        public int? HardwareMaterialId { get; set; }
        public int? HardwareColorId { get; set; }
        public string Sort { get; set; }
        private string _search;
        public string Search 
        { 
            get => _search; 
            set => _search = value.ToLower(); 
        }
    }
}