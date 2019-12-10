using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
// STUBBED: applicant does not have ID
/*
    [ApiController]
    [Route("[controller]")]
    public class ApplicantController
    {
            private IMongoCollection<Applicant> Applicants { get; }
            public ApplicantController(IDatabaseSettings databaseSettings)
            {
                Applicants = databaseSettings.GetCollection<Applicant>();
            }
            
            [HttpGet]
            public IEnumerable<Applicant> GetAll()
            {
                return Applicants.Find(tag => true).ToList();
    
            }
            [HttpGet("{id}")]
            public Applicant GetById(string id)
            {
                return Applicants.Find(applicant => applicant.Id == id).FirstOrDefault();
            }
    
            [HttpPost]
            public Applicant Create(Applicant applicant)
            {
                Applicants.InsertOne(applicant);
                return applicant;
            }
    
            [HttpPut("{id}")]
            public Applicant Edit(string id, Applicant applicant)
            {
                Applicants.FindOneAndReplace(applicant => applicant.Id == id, applicant);
                return applicant;
            }
    
            [HttpDelete("{id}")]
            public void Delete(string id)
            {
                Applicants.DeleteOne(applicant => applicant.Id == id);
            }
    
        }
*/
}
