using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssignmentController
    {
            private IMongoCollection<Assignment> Assignments { get; }
            public AssignmentController(IDatabaseSettings databaseSettings)
            {
                Assignments = databaseSettings.GetCollection<Assignment>();
            }
            
            [HttpGet]
            public IEnumerable<Assignment> GetAll()
            {
                return Assignments.Find(tag => true).ToList();
    
            }
            [HttpGet("{id}")]
            public Assignment GetById(string id)
            {
                return Assignments.Find(assignment => assignment.Id == id).FirstOrDefault();
            }
    
            [HttpPost]
            public Assignment Create(Assignment review)
            {
                Assignments.InsertOne(review);
                return review;
            }
    
            [HttpPut("{id}")]
            public Assignment Edit(string id, Assignment review)
            {
                Assignments.FindOneAndReplace(assignment => assignment.Id == id, review);
                return review;
            }
    
            [HttpDelete("{id}")]
            public void Delete(string id)
            {
                Assignments.DeleteOne(assignment => assignment.Id == id);
            }
    
        }
}