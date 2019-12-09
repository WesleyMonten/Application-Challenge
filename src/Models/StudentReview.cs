using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    public class StudentReview
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ReviewText { get; set; }
        public (StudentTag tag, float score)[] Tags { get; set; }
        public Assignment Assignment { get; set; }
    }
}