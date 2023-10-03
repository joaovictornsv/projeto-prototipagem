using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class Driver
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("DocumentNumber")]
        public string DocumentNumber { get; set; }
    }
}
