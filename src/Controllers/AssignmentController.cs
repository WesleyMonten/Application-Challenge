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
            // TODO: return enkel drafts als companyId uit session matcht
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
            [HttpGet("company/{id}/{stage}")]
            public IEnumerable<Assignment> GetByCompanyAndStage(string id, AssignmentStage stage)
            {
                return Assignments.Find(assignment => assignment.CompanyId == id && assignment.Stage == stage).ToList();
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