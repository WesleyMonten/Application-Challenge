using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    public class StudentInfo : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public User User { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }
        public (StudentTag tag, float score)[] Skills { get; set; }
        public string Biography { get; set; }
        public StudentReview[] Reviews { get; set; }
        public bool Available { get; set; }
    }
}