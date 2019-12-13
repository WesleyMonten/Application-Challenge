using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApplicationChallenge.Models;
using ApplicationChallenge.Models.API;
using ApplicationChallenge.Models.Database;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace ApplicationChallenge.Services
{
    public interface IUserService
    {
        User GetUserById(string id);
        User GetUserByEmail(string email);
        User GetUserByUsername(string username);

        string RegisterUser(UserRegistration reg);
        string CheckUserLogin(UserLogin login);
    }
    
    public class UserService : IUserService
    {
        private IAppSettings AppSettings { get; }
        private IMongoCollection<User> Users { get; set; }

        public UserService(IDatabaseSettings databaseSettings, IAppSettings appSettings)
        {
            Users = databaseSettings.GetCollection<User>();
            AppSettings = appSettings;
        }

        public User GetUserById(string id) => Users.Find(u => u.Id == id).FirstOrDefault();
        public User GetUserByEmail(string email) => Users.Find(u => u.Email.ToLowerInvariant() == email.ToLowerInvariant()).FirstOrDefault();
        public User GetUserByUsername(string username) => Users.Find(u => u.Nickname.ToLowerInvariant() == username.ToLowerInvariant()).FirstOrDefault();

        public string RegisterUser(UserRegistration reg)
        {
            if (reg.Email == default ||
                reg.Password == default ||
                reg.Username == default ||
                reg.DateOfBirth == default) {
                throw new Exception("Some field was not filled in");
            }
            
            if (GetUserByEmail(reg.Email) != null) {
                throw new Exception("Email already exists");
            }
            if (GetUserByUsername(reg.Username) != null) {
                throw new Exception("Username already exists");
            }
            
            var user = reg.CreateNewUser();
            Users.InsertOne(user);
            return CreateToken(user);
        }

        public string CheckUserLogin(UserLogin login)
        {
            var user = GetUserByEmail(login.Email);
            if (user is null) {
                throw new Exception("Email not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash)) {
                throw new Exception("Incorrect password");
            }

            return CreateToken(user);
        }

        private string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? Roles.Admin : Roles.User),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}