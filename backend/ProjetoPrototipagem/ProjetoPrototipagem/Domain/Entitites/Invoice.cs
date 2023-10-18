using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class Invoice
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("CompanyName")]
        public string? CompanyName { get; set; }

        [BsonElement("LoadWeight")]
        public double LoadWeight { get; set; }

        [BsonElement("LoadItems")]
        public string? LoadItems { get; set; }

        [BsonElement("Amount")]
        public double? Amount { get; set; }
    }
}
