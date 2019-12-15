using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public object ShowVarious()
        {
            var anon = new {
                User,
            };

            return anon;
        }

        [Authorize]
        [HttpGet("auth")]
        public string TestAuth() => "Auth works!";

        [Authorize(Roles = Roles.User)]
        [HttpGet("auth/user")]
        public string TestAuthUser() => "User auth works!";

        [Authorize(Roles = Roles.Admin)]
        [HttpGet("auth/admin")]
        public string TestAuthAdmin() => "Admin auth works!";
    }
}