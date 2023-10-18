using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class LicensePlate
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("OwnerId")]
        public string? OwnerId { get; set; }

        [BsonElement("DriverId")]
        public string? DriverId { get; set; }

        [BsonElement("Number")]
        public string? Number { get; set; }
    }
}
