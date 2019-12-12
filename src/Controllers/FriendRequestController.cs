using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FriendRequestController: ControllerBase
    {
        private IMongoCollection<FriendRequest> FriendRequests { get; }

        public FriendRequestController(IDatabaseSettings databaseSettings)
        {
            FriendRequests = databaseSettings.GetCollection<FriendRequest>();
        }

        [HttpGet]
        public IEnumerable<FriendRequest> GetAll()
        {
            return FriendRequests.Find(tag => true).ToList();
        }
         [HttpGet("{id}")]
         public FriendRequest GetById(string id)
         {
             return FriendRequests.Find(request => request.Id == id).First();
         }
         [HttpGet("sender/{id}")]
         public IEnumerable<FriendRequest> GetBySender(string id)
         {
             return FriendRequests.Find(request => request.Sender == id).ToList();
         }
         [HttpGet("receiver/{id}")]
         public IEnumerable<FriendRequest> GetByReceiver(string id)
         {
             return FriendRequests.Find(request => request.Receiver == id).ToList();
         }
         [HttpPost]
         public FriendRequest Create(FriendRequest request)
         {
             FriendRequests.InsertOne(request);
             return request;
         }
         [HttpDelete("{id}")]
         public void Delete(string id)
         {
             FriendRequests.DeleteOne(request => request.Id == id);
         }
    }
}