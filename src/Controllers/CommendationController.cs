using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using ApplicationChallenge.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplicationChallenge.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class CommendationController : ControllerBase
    {
        [HttpGet("company")]
        public Dictionary<string, string> GetCompanyCommendations() => GetPrettyNames<CompanyCommendation>();

        [HttpGet("applicant")]
        public Dictionary<string, string> GetApplicantCommendations() => GetPrettyNames<ApplicantCommendation>();

        private static Dictionary<string, string> GetPrettyNames<T>() where T : Enum =>
            new Dictionary<string, string>(typeof(T)
                .GetFields(BindingFlags.Static | BindingFlags.Public)
                .Select(fi => new KeyValuePair<string, string>(fi.Name, fi.GetCustomAttribute<DescriptionAttribute>()?.Description)));
    }
}