using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentTagController : ControllerBase
    {
        private IMongoCollection<StudentTag> StudentTags { get; }

        public StudentTagController(IDatabaseSettings databaseSettings)
        {
            StudentTags = databaseSettings.GetCollection<StudentTag>();
        }

        [HttpGet]
        public IEnumerable<StudentTag> Index()
        {
            return StudentTags.Find(tag => true).ToList();
        }
        
        [HttpGet("test/{name}")]
        public void Test(string name)
        {
            StudentTags.InsertOne(new StudentTag { Name = name});
        }
        
        [HttpPost]
        public StudentTag Create(StudentTag book)
        {
            StudentTags.InsertOne(book);
            return book;
        }
    }
}