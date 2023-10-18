﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class LicensePlate
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("Number")]
        public string? Number { get; set; }

        [BsonElement("VehicleModel")]
        public string? VehicleModel { get; set; }

        [BsonElement("VehicleYear")]
        public string? VehicleYear { get; set; }
    }
}
