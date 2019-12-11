using System;
using System.Collections;
using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyReviewController: ControllerBase
    {
        private IMongoCollection<CompanyReview> CompanyReviews { get; }
        public CompanyReviewController(IDatabaseSettings databaseSettings)
        {
            CompanyReviews = databaseSettings.GetCollection<CompanyReview>();
        }
        
        [HttpGet]
        public IEnumerable<CompanyReview> GetAll()
        {
            return CompanyReviews.Find(tag => true).ToList();

        }
        [HttpGet("company/{id}")]
        public IEnumerable<CompanyReview> GetByCompany(string id)
        {
            return CompanyReviews.Find(companyReview => companyReview.CompanyId == id).ToList();
        }
        [HttpGet("applicant/{id}")]
        public IEnumerable<CompanyReview> GetByApplicant(string id)
        {
            return CompanyReviews.Find(companyReview => companyReview.ApplicantId == id).ToList();
        }

        [HttpGet("assignment/{id}")]
        public CompanyReview GetByAssignment(string id)
        {
            return CompanyReviews.Find(companyReview => companyReview.AssignmentId == id).First();
        }

        [HttpGet("{id}")]
        public CompanyReview GetById(string id)
        {
            return CompanyReviews.Find(companyReview => companyReview.Id == id).FirstOrDefault();
        }

        [HttpPost]
        public CompanyReview Create(CompanyReview review)
        {
            CompanyReviews.InsertOne(review);
            return review;
        }

        [HttpPut("{id}")]
        public CompanyReview Edit(string id, CompanyReview review)
        {
            review.Id = id;
            CompanyReviews.FindOneAndReplace(companyReview => companyReview.Id == id, review);
            return review;
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            CompanyReviews.DeleteOne(companyReview => companyReview.Id == id);
        }

    }
}