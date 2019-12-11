using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssignmentController: ControllerBase
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
            [HttpGet("open")]
            public IEnumerable<Assignment> GetOpen()
            {
                return Assignments.Find(assignment =>  assignment.Stage == AssignmentStage.Open).ToList();
            }

            [HttpGet("company/{id}")]
            public IEnumerable<Assignment> GetByCompany(string id)
            {
                return Assignments.Find(assignment => assignment.CompanyId == id).ToList();
            }
            [HttpGet("company/{id}/open")]
            public IEnumerable<Assignment> GetOpenByCompany(string id)
            {
                return Assignments.Find(assignment => assignment.CompanyId == id && assignment.Stage == AssignmentStage.Open).ToList();
            }
            [HttpGet("company/{id}/closed")]
            public IEnumerable<Assignment> GetClosedByCompany(string id)
            {
                return Assignments.Find(assignment => assignment.CompanyId == id && assignment.Stage == AssignmentStage.Closed).ToList();
            }
// alleen voor company/creator zelf
            [HttpGet("company/{id}/draft")]
            public IEnumerable<Assignment> GetDraftByCompany(string id)
            {
                return Assignments.Find(assignment => assignment.CompanyId == id && assignment.Stage == AssignmentStage.Draft).ToList();
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
            public Assignment Edit(string id, Assignment ass)
            {
                Assignments.FindOneAndReplace(assignment => assignment.Id == id, ass);
                return ass; // hee hee
            }
    
            [HttpDelete("{id}")]
            public void Delete(string id)
            {
                Assignments.DeleteOne(assignment => assignment.Id == id);
            }
    
        }
}