using Microsoft.AspNetCore.Mvc;
using ProjetoPrototipagem.Domain.Entitites;
using ProjetoPrototipagem.Services;

namespace ProjetoPrototipagem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LicensePlateController : ControllerBase
    {
        private readonly ILogger<LicensePlateController> _logger;
        private readonly LicensePlateService _licensePlateService;

        public LicensePlateController(ILogger<LicensePlateController> logger, LicensePlateService licensePlateService)
        {
            _logger = logger;
            _licensePlateService = licensePlateService;
        }

        [HttpGet(Name = "GetLicensePlates")]
        public async Task<List<LicensePlate>> GetLicensePlates() =>
            await _licensePlateService.GetLicensePlatesAsync();

        [HttpPost(Name = "PostLicensePlate")]
        public async Task<LicensePlate> PostLicensePlate(LicensePlate licensePlate)
        {
            await _licensePlateService.CreateLicensePlateAsync(licensePlate);

            return licensePlate;
        }
    }
}