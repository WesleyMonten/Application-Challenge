using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssignmentReviewController: ControllerBase
    {
         private IMongoCollection<AssignmentReview> AssignmentReviews { get; }
         public AssignmentReviewController(IDatabaseSettings databaseSettings)
         {
             AssignmentReviews = databaseSettings.GetCollection<AssignmentReview>();
         }
         
         [HttpGet]
         public IEnumerable<AssignmentReview> GetAll()
         {
             return AssignmentReviews.Find(tag => true).ToList();
 
         }
         [HttpGet("{id}")]
         public AssignmentReview GetById(string id)
         {
             return AssignmentReviews.Find(assignmentReview => assignmentReview.Id == id).First();
         }
         [HttpGet("assignment/{id}")]
         public AssignmentReview GetByAssignment(string id)
         {
             return AssignmentReviews.Find(assignmentReview => assignmentReview.AssignmentId == id).First();
         }
         [HttpGet("applicant/{id}")]
         public IEnumerable<AssignmentReview> GetByApplicant(string id)
         {
             return AssignmentReviews.Find(assignmentReview => assignmentReview.ApplicantId == id).ToList();
         }
         [HttpGet("company/{id}")]
         public IEnumerable<AssignmentReview> GetByCompany(string id)
         {
             return AssignmentReviews.Find(assignmentReview => assignmentReview.CompanyId == id).ToList();
         }
         [HttpPost]
         public AssignmentReview Create(AssignmentReview review)
         {
             AssignmentReviews.InsertOne(review);
             return review;
         }
 
         [HttpPut("{id}")]
         public AssignmentReview Edit(string id, AssignmentReview review)
         {
             AssignmentReviews.FindOneAndReplace(assignmentReview => assignmentReview.Id == id, review);
             return review;
         }
 
         [HttpDelete("{id}")]
         public void Delete(string id)
         {
             AssignmentReviews.DeleteOne(assignmentReview => assignmentReview.Id == id);
         }
    }
}