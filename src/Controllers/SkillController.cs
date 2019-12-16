using System.Collections.Generic;
using ApplicationChallenge.Models;
using ApplicationChallenge.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SkillController: ControllerBase
    {
        private IMongoCollection<Skill> Skills{ get; }
        
        public SkillController(IDatabaseSettings databaseSettings)
        {
            Skills = databaseSettings.GetCollection<Skill>();
        }
        [HttpGet]
        public IEnumerable<Skill> GetAll()
        {
            return Skills.Find(tag => true).ToList();
        }
    }
}