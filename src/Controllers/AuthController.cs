using System;
using System.Collections.Generic;
using ApplicationChallenge.Models;
using ApplicationChallenge.Models.API;
using ApplicationChallenge.Models.Database;
using ApplicationChallenge.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IUserService UserService { get; }
        private IMongoCollection<User> Users { get; }

        public AuthController(IDatabaseSettings databaseSettings, IUserService userService)
        {
            UserService = userService;
            Users = databaseSettings.GetCollection<User>();
        }

        [HttpGet]
        public List<User> Test()
        {
            return Users.Find(user => true).ToList();
        }

        [HttpPost("login")]
        public SuccessWrapper<string> Login([FromBody] UserLogin login)
        {
            try
            {
                var token = UserService.CheckUserLogin(login);
                return SuccessWrapper.Success(token);
            }
            catch (Exception e)
            {
                return SuccessWrapper.Error<string>(e);
            }
        }
        
        [HttpPost("register")]
        public SuccessWrapper<string> Register([FromBody] UserRegistration regInfo)
        {
            try
            {
                // detect if there are any users in the database already
                var firstUser = Users.Find(x => true).FirstOrDefault();
                bool createAdmin = firstUser is null;
                
                var token = UserService.RegisterUser(regInfo, createAdmin);
                return SuccessWrapper.Success(token);
            }
            catch (Exception e)
            {
                return SuccessWrapper.Error<string>(e);
            }
        }
    }
}