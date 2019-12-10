using MongoDB.Driver;

namespace ApplicationChallenge.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }

        public IMongoCollection<T> GetCollection<T>() where T : IDatabaseModel
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            return database.GetCollection<T>(typeof(T).Name);
        }
    }

    public interface IDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }

        IMongoCollection<T> GetCollection<T>() where T : IDatabaseModel;
    }
}