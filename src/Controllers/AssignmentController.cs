using System.Collections.Generic;
using System.Linq;
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
    public class AssignmentController: ControllerBase
    {
            // TODO: return enkel drafts als companyId uit session matcht
            private IMongoCollection<Assignment> Assignments { get; }
            private IMongoCollection<AssignmentTopic> Topics { get; }
            public AssignmentController(IDatabaseSettings databaseSettings)
            {
                Assignments = databaseSettings.GetCollection<Assignment>();
                Topics = databaseSettings.GetCollection<AssignmentTopic>();
            }
            
            [HttpGet]
            public IEnumerable<Assignment> GetAll()
            {
                return Assignments.Find(tag => true).ToList();
            }
            [HttpGet("topics")]
            public IEnumerable<AssignmentTopic> GetTopics()
            {
                return Topics.Find(tag => true).ToList();
            }
            [HttpGet("open")]
            public IEnumerable<Assignment> GetOpen()
            {
                return Assignments.Find(assignment =>  assignment.Stage == AssignmentStage.Open).ToList();
            }
            [HttpGet("open/title/{name}")]
            public IEnumerable<Assignment> GetOpenByName(string name)
            {
                return Assignments.Find(assignment =>  assignment.Stage == AssignmentStage.Open && assignment.Title == name).ToList(); // FIXME: title LIKE * name *
            }
            [HttpGet("company/{id}")]
            public IEnumerable<Assignment> GetByCompany(string id)
            {
                id = this.ResolveUserId(id);
                // TODO: fix this, this is horrible. blame jonas
// werkt alleen as de sterre goe staan en das nu dus ni naart schijnt
//                return Assignments.Find(assignment => assignment.CompanyId == id).ToList();
                IEnumerable<Assignment> ass = Assignments.Find(tag => true).ToList();
                List<Assignment> retval = new List<Assignment>();
                foreach(Assignment a in ass)
                {
                    if (a.CompanyId.Equals(id))
                        retval.Add(a);
                }
                return retval;
            }
            [HttpGet("company/{id}/{stage}")]
            public IEnumerable<Assignment> GetByCompanyAndStage(string id, AssignmentStage stage)
            {
                id = this.ResolveUserId(id);
                
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