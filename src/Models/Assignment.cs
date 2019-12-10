using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models
{
    /// <summary>
    /// A job or internship offer, given by a <see cref="Company"/>
    /// </summary>
    public class Assignment : IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsInternship { get; set; }
        
        /// <summary>
        /// How much this <see cref="Assignment"/> pays
        /// </summary>
        public double Compensation { get; set; }
        /// <summary>
        /// The stage this <see cref="Assignment"/> is in, from <see cref="AssignmentStage.Draft"/> to
        /// <see cref="AssignmentStage.Finished"/>, optionally diverting to <see cref="AssignmentStage.Cancelled"/>
        /// </summary>
        public AssignmentStage Stage { get; set; }
        /// <summary>
        /// The topics that describe this <see cref="Assignment"/>
        /// </summary>
        public AssignmentTopic[] Topics { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }
    }
}