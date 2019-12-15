using System;
using ApplicationChallenge.Models.Database;

namespace ApplicationChallenge.Models.API
{
    public class UserInfo
    {
        public string AccountId { get; set; }
        public string Nickname { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string LinkedInUrl { get; set; }

        public ApplicantInfo Applicant { get; set; }
        public CompanyInfo Company { get; set; }

        public class ApplicantInfo
        {
            public Skill[] Skills { get; set; }
            public bool Available { get; set; }
            public string Biography { get; set; }
        }

        public class CompanyInfo
        {
            public string Name { get; set; }
            public string Biography { get; set; }
        }
    }
}