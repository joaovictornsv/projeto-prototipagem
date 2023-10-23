using Microsoft.AspNetCore.Mvc;
using ProjetoPrototipagem.Domain.Entitites;
using ProjetoPrototipagem.Domain.Enums;
using ProjetoPrototipagem.Domain.Inputs;
using ProjetoPrototipagem.Services;

namespace ProjetoPrototipagem.Controllers
{
    [ApiController]
    [Route("[controller]/")]
    public class WeighingController : ControllerBase
    {
        private readonly ILogger<WeighingController> _logger;
        private readonly WeighingService _weighingService;
        private readonly InvoiceService _invoiceService;
        private readonly DriverService _driverService;
        private readonly LicensePlateService _licensePlateService;
        private readonly AuxService _auxService;


        public WeighingController(ILogger<WeighingController> logger, WeighingService weighingService, InvoiceService invoiceService, DriverService driverService, LicensePlateService licensePlateService, AuxService auxService)
        {
            _logger = logger;
            _weighingService = weighingService;
            _invoiceService = invoiceService;
            _driverService = driverService;
            _licensePlateService = licensePlateService;
            _auxService = auxService;
        }

        [HttpPost("verify_plate")]
        public async Task<bool> PostVerifyPlateRegistry(string licensePlateId) =>
            await _weighingService.VerifyPlateNumberRegistry(licensePlateId);

        [HttpPost("verify_weighing")]
        public async Task<bool> PostVerifyWeighing(string weighingId, double weight)
        {
            var weighing = await _weighingService.GetWeighing(weighingId);
            var invoice = await _invoiceService.GetInvoice(weighing.InvoiceId);

            return _auxService.VerifyWeigh(invoice.LoadWeight, weight);
        }

        [HttpPost("create_weighing")]
        public async Task PostCreateWeighing(CreateWeighingInput weighing)
        {
            var driver = await _driverService.GetOrCreateDriverAsync(new Driver
            {
                Name = weighing.Driver.Name,
                DocumentNumber = weighing.Driver.DocumentNumber
            });

            var licensePlate= await _licensePlateService.GetOrCreateLicensePlateAsync(new LicensePlate
            {
                Number = weighing.LicensePlate.Number,
                VehicleModel = weighing.LicensePlate.VehicleModel,
                VehicleYear = weighing.LicensePlate.VehicleYear
            });

            var invoice = await _invoiceService.GetOrCreateInvoiceAsync(new Invoice
            {
                CompanyName = weighing.Invoice.CompanyName,
                LoadWeight = weighing.Invoice.LoadWeight,
                LoadItems = weighing.Invoice.LoadItems,
                Amount = weighing.Invoice.Amount
            });

            await _weighingService.CreateWeighingAsync(new Weighing
            {
                DriverId = driver.id,
                LicensePlateId = licensePlate.id,
                InvoiceId = invoice.id,
                Status = StatusEnum.PENDING
            });
        }
    }
}