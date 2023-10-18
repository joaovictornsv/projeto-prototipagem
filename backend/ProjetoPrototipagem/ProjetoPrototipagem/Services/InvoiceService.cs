using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Data.Seeds;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Services
{
    public class InvoiceService
    {
        private readonly IMongoCollection<Invoice> _colection;

        public InvoiceService(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.MainDataBase);
            _colection = mongoDatabase.GetCollection<Invoice>(settings.Value.InvoiceDb);
            SeedInvoiceDb.SeedData(_colection);
        }

        public async Task<List<Invoice>> GetInvoicesAsync() =>
            await _colection.Find(x => true).ToListAsync();
        public async Task<Invoice> GetInvoice(string id) =>
            await _colection.Find(x => x.id == id).FirstOrDefaultAsync();
        public async Task<string?> CreateInvoiceAsync(Invoice invoice)
        {
            await _colection.InsertOneAsync(invoice);
            return invoice.id;
        }
        public async Task UpdateInvoiceAsync(string id, Invoice invoice) =>
            await _colection.ReplaceOneAsync(x => x.id == id, invoice);
        public async Task RemoveInvoiceAsync(string id) =>
            await _colection.DeleteOneAsync(x => x.id == id);
    }
}
