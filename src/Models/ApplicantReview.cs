using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    /// <summary>
    /// A review on an <see cref="Assignment"/>, given by an <see cref="Applicant"/>
    /// </summary>
    public class ApplicantReview : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ReviewText { get; set; }
        public ApplicantCommendation[] Commendations { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }
    }
}