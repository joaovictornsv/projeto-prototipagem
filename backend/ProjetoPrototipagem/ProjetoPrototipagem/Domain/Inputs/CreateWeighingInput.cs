
using Newtonsoft.Json;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Domain.Inputs
{
    public class CreateWeighingInput
    {
        [JsonProperty("driver")]
        public DriverInput Driver { get; set; }

        [JsonProperty("invoice")]
        public InvoiceInput Invoice { get; set; }

        [JsonProperty("license_plate")]
        public LicensePlateInput LicensePlate { get; set; }
    }
}

