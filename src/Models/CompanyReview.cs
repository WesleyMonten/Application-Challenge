using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    public class CompanyReview
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ReviewText { get; set; }
        public (CompanyTag tag, float score)[] Tags { get; set; }
        public (string tag, float score)[] CustomTags { get; set; }
        public Assignment Assignment { get; set; }
    }
}