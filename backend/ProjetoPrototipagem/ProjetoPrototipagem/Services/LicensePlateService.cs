
using Microsoft.Extensions.Options;
using MongoDB.Bson;
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
        await _colection.Find(x => x.id == id).FirstOrDefaultAsync();

    public async Task<LicensePlate> GetOrCreateLicensePlateAsync(LicensePlate licensePlate)
    {
        var licensePlateGet = await GetLicensePlateByNumberAsync(licensePlate.Number);
        if (licensePlate is null){
            licensePlateGet = await CreateLicensePlateAsync(licensePlate);
        };
        return licensePlateGet;
    }

    public async Task<LicensePlate?> GetLicensePlateByNumberAsync(string number) =>
        await _colection.Find(x => x.Number == number).FirstOrDefaultAsync();

    public async Task<LicensePlate?> CreateLicensePlateAsync(LicensePlate licensePlate)
    {
        await _colection.InsertOneAsync(licensePlate);
        return licensePlate;
    }
    public async Task UpdateLicensePlateAsync(string id, LicensePlate licensePlate) =>
        await _colection.ReplaceOneAsync(x => x.id == id, licensePlate);
    public async Task RemoveLicensePlateAsync(string id) =>
        await _colection.DeleteOneAsync(x => x.id == id);
}