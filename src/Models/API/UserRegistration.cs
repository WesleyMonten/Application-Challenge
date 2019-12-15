using System;
using ApplicationChallenge.Models.Database;

namespace ApplicationChallenge.Models.API
{
    public class UserRegistration
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        
        public Applicant Applicant { get; set; }
        public Company Company { get; set; }

        public User CreateNewUser()
        {
            return new User
            {
                Nickname = Username,
                Email = Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(Password),
                DateOfBirth = DateOfBirth,
                
                Applicant = Applicant,
                Company = Company,
            };
        }
    }
}