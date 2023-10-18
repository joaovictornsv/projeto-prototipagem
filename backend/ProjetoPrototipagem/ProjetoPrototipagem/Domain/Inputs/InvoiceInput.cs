using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class InvoiceInput
    {
        [JsonProperty("company_name")]
        public string? CompanyName { get; set; }

        [JsonProperty("load_weight")]
        public double LoadWeight { get; set; }

        [JsonProperty("load_items")]
        public string? LoadItems { get; set; }

        [JsonProperty("amount")]
        public double? Amount { get; set; }
    }
}
