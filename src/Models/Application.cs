using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    public class Application: IDatabaseModel
    {
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Text { get; set; }
        public ApplicationStatus Status { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string AssignmentId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ApplicantId { get; set; }
    }
}