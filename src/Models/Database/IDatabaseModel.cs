using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models.Database
{
    public interface IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }
    }
}