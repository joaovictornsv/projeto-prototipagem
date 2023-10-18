using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class DriverInput
    {

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("document_number")]
        public string? DocumentNumber { get; set; }
    }
}
