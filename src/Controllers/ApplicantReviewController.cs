using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicantReviewController
    {
         private IMongoCollection<ApplicantReview> ApplicantReviews { get; }
         public ApplicantReviewController(IDatabaseSettings databaseSettings)
         {
             ApplicantReviews = databaseSettings.GetCollection<ApplicantReview>();
         }
         
         [HttpGet]
         public IEnumerable<ApplicantReview> GetAll()
         {
             return ApplicantReviews.Find(tag => true).ToList();
 
         }
         [HttpGet("{id}")]
         public ApplicantReview GetById(string id)
         {
             return ApplicantReviews.Find(applicantReview => applicantReview.Id == id).FirstOrDefault();
         }
 
         [HttpPost]
         public ApplicantReview Create(ApplicantReview review)
         {
             ApplicantReviews.InsertOne(review);
             return review;
         }
 
         [HttpPut("{id}")]
         public ApplicantReview Edit(string id, ApplicantReview review)
         {
             ApplicantReviews.FindOneAndReplace(applicantReview => applicantReview.Id == id, review);
             return review;
         }
 
         [HttpDelete("{id}")]
         public void Delete(string id)
         {
             ApplicantReviews.DeleteOne(applicantReview => applicantReview.Id == id);
         }
    }
}