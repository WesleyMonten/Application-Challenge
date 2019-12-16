using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using ApplicationChallenge.Models.API;
using ApplicationChallenge.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplicationChallenge.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class CommendationController : ControllerBase
    {
        [HttpGet("company")]
        public List<Commendation> GetCompanyCommendations() => GetPrettyNames<CompanyCommendation>();

        [HttpGet("applicant")]
        public List<Commendation> GetApplicantCommendations() => GetPrettyNames<ApplicantCommendation>();

        private static List<Commendation> GetPrettyNames<T>() where T : Enum =>
            typeof(T)
                .GetFields(BindingFlags.Static | BindingFlags.Public)
                .Select(fi => new Commendation(fi.Name, fi.GetCustomAttribute<DescriptionAttribute>()?.Description))
                .ToList();
    }
}