using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApplicationChallenge.Models.Database
{
    public class FriendRequest: IDatabaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Sender { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Receiver { get; set; }
    }
}