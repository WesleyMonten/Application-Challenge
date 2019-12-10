using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    /// <summary>
    /// An account in the application. Can be an <see cref="Applicant"/> or a <see cref="Company"/>
    /// </summary>
    public class User : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Nickname { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string LinkedInUrl { get; set; }
        public bool IsAdmin { get; set; }

        /// <summary>
        /// <see cref="Applicant"/> data, if the user is one
        /// </summary>
        public Applicant Applicant { get; set; }
        /// <summary>
        /// <see cref="Company"/> data, if the user represents one
        /// </summary>
        public Company Company { get; set; }
    }
}