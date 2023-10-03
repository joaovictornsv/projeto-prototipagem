using Microsoft.AspNetCore.Mvc;
using ProjetoPrototipagem.Domain.Entitites;
using ProjetoPrototipagem.Services;

namespace ProjetoPrototipagem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OwnerController : ControllerBase
    {
        private readonly ILogger<OwnerController> _logger;
        private readonly OwnerService _ownerService;

        public OwnerController(ILogger<OwnerController> logger, OwnerService ownerService)
        {
            _logger = logger;
            _ownerService = ownerService;
        }

        [HttpGet(Name = "GetOwners")]
        public async Task<List<Owner>> GetOwners() =>
            await _ownerService.GetOwnersAsync();

        [HttpPost(Name = "PostOwner")]
        public async Task<Owner> PostOwner(Owner owner)
        {
            await _ownerService.CreateOwnerAsync(owner);

            return owner;
        }
    }
}