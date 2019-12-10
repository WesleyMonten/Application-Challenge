using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    /// <summary>
    /// A topic for an <see cref="Assignment"/>
    /// </summary>
    /// <example>
    /// .NET, Java, Sysadmin, Charity Work, Remote Work
    /// </example>
    public class AssignmentTopic : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        
        /// <summary>
        /// The 6 character hex color code for this topic
        /// </summary>
        public string Color { get; set; }
    }
}