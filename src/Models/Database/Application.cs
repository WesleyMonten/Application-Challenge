using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models.Database
{
    public class Application: IDatabaseModel
    {
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Text { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AssignmentId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ApplicantId { get; set; }
        public bool Accepted{ get; set; }
    }
}