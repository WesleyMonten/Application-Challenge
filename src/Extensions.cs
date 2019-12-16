using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace ApplicationChallenge
{
    public static class Extensions
    {
        /// <summary>
        /// Resolves the user id to the user's current id in case it is string "me"
        /// </summary>
        public static string ResolveUserId(this ControllerBase controller, string possibleMe)
        {
            if (possibleMe != "me") return possibleMe;
            
            return controller.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? throw new Exception("No user");;
        }
    }
}