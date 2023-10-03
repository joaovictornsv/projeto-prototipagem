
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class Owner 
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("Number")]
        public string Number {  get; set; }
    }
}
