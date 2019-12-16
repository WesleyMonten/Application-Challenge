using System;
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
            
            // TODO: only allow when either admin or using /me
        }

        [HttpGet("{id}")]
        public User GetOwn(string id)
        {
            id = this.ResolveUserId(id);

            return Users.Find(x => x.Id == id).First();
        }

        [HttpPut("{id}")]
        public User PutOwn(string id, User user)
        {
            id = this.ResolveUserId(id);

            return Users.FindOneAndReplace(u => u.Id == id, user);
        }

        [HttpDelete("me")]
        public bool DeleteOwn()
        {
            throw new NotImplementedException();
        }
        
    }
}