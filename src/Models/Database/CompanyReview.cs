using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models.Database
{
    /// <summary>
    /// A review given to an <see cref="Applicant"/> by a <see cref="Company"/>
    /// </summary>
    public class CompanyReview : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ReviewText { get; set; }
        public CompanyCommendation[] Commendations { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string AssignmentId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ApplicantId { get; set; }
    }
}