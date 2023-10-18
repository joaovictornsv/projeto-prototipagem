using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Data.Seeds;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Services
{
    public class WeighingService
    {
        private readonly IMongoCollection<Weighing> _colection;

        public WeighingService(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.MainDataBase);
            _colection = mongoDatabase.GetCollection<Weighing>(settings.Value.WeighingDb);
            SeedWeighingDb.SeedData(_colection);
        }

        public async Task<List<Weighing>> GetWeighingsAsync() =>
            await _colection.Find(x => true).ToListAsync();
        public async Task<Weighing> GetWeighing(string id) =>
            await _colection.Find(x => x.id == id).FirstOrDefaultAsync();
        public async Task<bool> VerifyPlateNumberRegistry(string id) =>
            await _colection.Find(x => x.LicensePlateId == id).FirstOrDefaultAsync() != null;
        public async Task CreateWeighingAsync(Weighing weighing) =>
            await _colection.InsertOneAsync(weighing);
        public async Task UpdateWeighingAsync(string id, Weighing weighing) =>
            await _colection.ReplaceOneAsync(x => x.id == id, weighing);
        public async Task RemoveWeighingAsync(string id) =>
            await _colection.DeleteOneAsync(x => x.id == id);
    }
}
