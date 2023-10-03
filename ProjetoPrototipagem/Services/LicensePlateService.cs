
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Domain.Entitites;

public class LicensePlateService
{
    private readonly IMongoCollection<LicensePlate> _colection;

    public LicensePlateService(IOptions<DatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.MainDataBase);

        _colection = mongoDatabase.GetCollection<LicensePlate>(settings.Value.LicensePlateDb);
    }

    public async Task<List<LicensePlate>> GetLicensePlatesAsync() =>
        await _colection.Find(x => true).ToListAsync();
    public async Task<LicensePlate> GetLicensePlate(string id) =>
        await _colection.Find(x => x._id == id).FirstOrDefaultAsync();
    public async Task CreateLicensePlateAsync(LicensePlate licensePlate) =>
        await _colection.InsertOneAsync(licensePlate);
    public async Task UpdateLicensePlateAsync(string id, LicensePlate licensePlate) =>
        await _colection.ReplaceOneAsync(x => x._id == id, licensePlate);
    public async Task RemoveLicensePlateAsync(string id) =>
        await _colection.DeleteOneAsync(x => x._id == id);
}