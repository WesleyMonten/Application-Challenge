using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationController: ControllerBase
    {
        private IMongoCollection<Application> Applications { get; }

        public ApplicationController(IDatabaseSettings databaseSettings)
        {
            Applications = databaseSettings.GetCollection<Application>();
        }
        [HttpGet]
        public IEnumerable<Application> GetAll()
        {
            return Applications.Find(tag => true).ToList();
        }
        [HttpGet("{id}")]
        public Application GetById(string id)
        {
            return Applications.Find(application=> application.Id == id).FirstOrDefault();
        }
        [HttpGet("assignment/{id}")]
        public IEnumerable<Application> GetByAssignment(string id)
        {
            return Applications.Find(application => application.AssignmentId == id).ToList();
        }
// FIXME: @Dario applicantId of UserId?        
        [HttpGet("applicant/{id}")]
        public IEnumerable<Application> GetByCompany(string id)
        {
            return Applications.Find(application => application.ApplicantId == id).ToList();
        }
        [HttpPost]
        public Application Create(Application app)
        {
            Applications.InsertOne(app);
            return app;
        }
        [HttpPut("{id}")]
        public Application Edit(string id, Application app)
        {
            Applications.FindOneAndReplace(applciation => applciation.Id == id, app);
            return app;
        }
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            Applications.DeleteOne(application => application.Id == id);
        }
    }
}