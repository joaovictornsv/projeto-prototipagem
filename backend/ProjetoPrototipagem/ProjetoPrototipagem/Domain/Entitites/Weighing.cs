using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using ProjetoPrototipagem.Domain.Enums;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class Weighing
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("InvoiceId")]
        public string? InvoiceId { get; set; }

        [BsonElement("LicensePlateId")]
        public string? LicensePlateId { get; set; }

        [BsonElement("DriverId")]
        public string? DriverId { get; set; }

        [BsonElement("Status")]
        public StatusEnum? Status { get; set; }
    }
}
