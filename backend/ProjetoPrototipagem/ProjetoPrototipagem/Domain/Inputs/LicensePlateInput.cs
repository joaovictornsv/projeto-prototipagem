using Newtonsoft.Json;

namespace ProjetoPrototipagem.Domain.Entitites
{
    public class LicensePlateInput
    {
        [JsonProperty("number")]
        public string? Number { get; set; }

        [JsonProperty("vehicle_model")]
        public string? VehicleModel { get; set; }

        [JsonProperty("vehicle_year")]
        public string? VehicleYear { get; set; }
    }
}
