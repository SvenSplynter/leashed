using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;

        }
        
        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42); //Simulating something we can't find, returns null.

            if(thing == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }
        
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42); //Simulating something we can't find, returns null.

            var thingToReturn = thing.ToString(); //Trying to do something with null to get a nullReferenceException

            return Ok();
        }
        
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400)); //Returns a 400 bad request result
        }
        
        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}