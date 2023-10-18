using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Data.Seeds;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Services
{
    public class DriverService
    {
        private readonly IMongoCollection<Driver> _colection;
        
        public DriverService(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.MainDataBase);
            _colection = mongoDatabase.GetCollection<Driver>(settings.Value.DriverDb);
            SeedDriverDb.SeedData(_colection);
        }

        public async Task<List<Driver>> GetDriversAsync() =>
            await _colection.Find(x => true).ToListAsync();
        public async Task<Driver> GetDriver(string id) =>
            await _colection.Find(x => x.id == id).FirstOrDefaultAsync();
        public async Task CreateDriverAsync(Driver driver) =>
            await _colection.InsertOneAsync(driver);
        public async Task UpdateDriverAsync(string id, Driver driver) =>
            await _colection.ReplaceOneAsync(x => x.id == id, driver);
        public async Task RemoveDriverAsync(string id) =>
            await _colection.DeleteOneAsync(x => x.id == id);
    }
}
