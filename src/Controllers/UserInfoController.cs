using System;
using System.Linq;
using System.Security.Claims;
using ApplicationChallenge.Models;
using ApplicationChallenge.Models.API;
using ApplicationChallenge.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : ControllerBase
    {
        private IMongoCollection<User> Users { get; }
        public UserInfoController(IDatabaseSettings databaseSettings)
        {
            Users = databaseSettings.GetCollection<User>();
        }

        [HttpGet("{id}")]
        public UserInfo GetById(string id)
        {
            id = this.ResolveUserId(id);

            if (id is null) {
                throw new Exception("No id");
            }

            var user = Users.Find(u => u.Id == id).FirstOrDefault() ?? throw new Exception("No user");

            return new UserInfo
            {
                AccountId = id,
                Nickname = user.Nickname,
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                LinkedInUrl = user.LinkedInUrl,
                
                Applicant = user.Applicant is null ? null : new UserInfo.ApplicantInfo
                {
                    Available = user.Applicant.Available,
                    Biography = user.Applicant.Biography,
                    Skills = user.Applicant.Skills,
                },
                Company = user.Company is null ? null : new UserInfo.CompanyInfo
                {
                    Biography = user.Company.Biography,
                    Name = user.Company.Name,
                },
            };
        }
    }
}