using System;

namespace ApplicationChallenge.Models
{
    public class User
    {
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string LinkedInUrl { get; set; }
        public bool Admin { get; set; }
    }
}