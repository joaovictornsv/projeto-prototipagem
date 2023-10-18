using Microsoft.AspNetCore.Mvc;
using ProjetoPrototipagem.Domain.Entitites;
using ProjetoPrototipagem.Services;

namespace ProjetoPrototipagem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DriverController : ControllerBase
    {
        private readonly ILogger<DriverController> _logger;
        private readonly DriverService _driverService;

        public DriverController(ILogger<DriverController> logger, DriverService driverService)
        {
            _logger = logger;
            _driverService = driverService;
        }

        [HttpGet(Name = "GetDrivers")]
        public async Task<List<Driver>> GetDrivers() =>
            await _driverService.GetDriversAsync();

        [HttpPost(Name = "PostDrivers")]
        public async Task<Driver> PostDriver(Driver driver) {
            await _driverService.CreateDriverAsync(driver);

            return driver;
        }
    }
}