using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IAppSettings AppSettings { get; }
        private IMongoCollection<User> Users { get; }

        public AuthController(IDatabaseSettings databaseSettings, IAppSettings appSettings)
        {
            AppSettings = appSettings;
            Users = databaseSettings.GetCollection<User>();
        }

        [HttpGet]
        public List<User> Test()
        {
            return Users.Find(user => true).ToList();
        }
        
        [HttpPost("register")]
        public SuccessWrapper Register([FromBody] UserRegistration regInfo)
        {
            if (regInfo.Email == default ||
                regInfo.Password == default ||
                regInfo.Username == default ||
                regInfo.DateOfBirth == default) {
                return SuccessWrapper.Error("Some field was not filled in");
            }
            
            if (Users.Find(u => u.Email.ToLowerInvariant() == regInfo.Email.ToLowerInvariant()).Any()) {
                return SuccessWrapper.Error("Email already exists");
            }
            if (Users.Find(u => u.Nickname.ToLowerInvariant() == regInfo.Username.ToLowerInvariant()).Any()) {
                return SuccessWrapper.Error("Username already exists");
            }
            
            var user = regInfo.CreateNewUser();
            Users.InsertOne(user);
            return SuccessWrapper.Success(CreateToken(user.Id));
        }

        private string CreateToken(string id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}