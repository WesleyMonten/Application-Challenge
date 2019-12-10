using System;

namespace ApplicationChallenge.Models
{
    public class UserRegistration
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }

        public User CreateNewUser()
        {
            return new User
            {
                Nickname = Username,
                Email = Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(Password),
                DateOfBirth = DateOfBirth,
            };
        }
    }
}