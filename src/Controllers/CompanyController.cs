using System.Collections.Generic;
using ApplicationChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ApplicationChallenge.Controllers
{
// STUBBED: company does not have ID
/*
    [ApiController]
    [Route("[controller]")]
    public class CompanyController
    {
            private IMongoCollection<Company> Companys { get; }
            public CompanyController(IDatabaseSettings databaseSettings)
            {
                Companys = databaseSettings.GetCollection<Company>();
            }
            
            [HttpGet]
            public IEnumerable<Company> GetAll()
            {
                return Companys.Find(tag => true).ToList();
    
            }
            [HttpGet("{id}")]
            public Company GetById(string id)
            {
                return Companys.Find(company => company.Id == id).FirstOrDefault();
            }
    
            [HttpPost]
            public Company Create(Company company)
            {
                Companys.InsertOne(company);
                return company;
            }
    
            [HttpPut("{id}")]
            public Company Edit(string id, Company company)
            {
                Companys.FindOneAndReplace(company => company.Id == id, company);
                return company;
            }
    
            [HttpDelete("{id}")]
            public void Delete(string id)
            {
                Companys.DeleteOne(company => company.Id == id);
            }
    
        }
*/
}