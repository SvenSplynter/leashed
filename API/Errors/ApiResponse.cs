namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "You (or at leashed someone) made a bad request. (400)",
                401 => "Authorization Error, not the leashed or your concerns. (401)",
                403 => "You need to be at leashed admin to do this. (403)",
                404 => "Couldn't find this resource, to say the leashed. (404)",
                500 => "Server Error, when you leashed expect it. (500)",
                _ => null
            };
        }
    }
}