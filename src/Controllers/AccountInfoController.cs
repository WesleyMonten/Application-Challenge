using System;
using System.Linq;
using System.Security.Claims;
using ApplicationChallenge.Models;
using ApplicationChallenge.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountInfoController : ControllerBase
    {
        private IMongoCollection<User> Users { get; }
        
        public AccountInfoController(IDatabaseSettings databaseSettings)
        {
            Users = databaseSettings.GetCollection<User>();
        }

        [HttpGet("{id}")] // TODO: enkel /me
        public User GetOwn()
        {
            string id = this.ResolveUserId("me");

            return Users.Find(x => x.Id == id).First();
        }

        [HttpPut("me")]
        public User PutOwn()
        {
            throw new NotImplementedException();
        }

        [HttpDelete("me")]
        public bool DeleteOwn()
        {
            throw new NotImplementedException();
        }
        
    }
}