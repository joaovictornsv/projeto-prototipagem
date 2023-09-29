using Microsoft.AspNetCore.Mvc;

namespace ProjetoPrototipagem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainController : ControllerBase
    {
        private readonly ILogger<MainController> _logger;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "EditDriver")]
        public string PatchEditDriver()
        {
            return "uoou";
        }
    }
}