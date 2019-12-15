using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models.Database
{
    /// <summary>
    /// A skill that can be shown by an <see cref="Applicant"/>
    /// </summary>
    public class Skill: IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        /// <summary>
        /// Optional accent color
        /// </summary>
        public string Color { get; set; }
    }
}