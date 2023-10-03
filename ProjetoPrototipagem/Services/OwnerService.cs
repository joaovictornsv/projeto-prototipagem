
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjetoPrototipagem.Data;
using ProjetoPrototipagem.Domain.Entitites;

public class OwnerService
{
    private readonly IMongoCollection<Owner> _colection;

    public OwnerService(IOptions<DatabaseSettings> produtoServices)
    {
        var mongoClient = new MongoClient(produtoServices.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(produtoServices.Value.MainDataBase);

        _colection = mongoDatabase.GetCollection<Owner>(produtoServices.Value.OwnerDb);
    }

    public async Task<List<Owner>> GetOwnersAsync() =>
        await _colection.Find(x => true).ToListAsync();
    public async Task<Owner> GetOwner(string id) =>
        await _colection.Find(x => x._id == id).FirstOrDefaultAsync();
    public async Task CreateOwnerAsync(Owner owner) =>
        await _colection.InsertOneAsync(owner);
    public async Task UpdateOwnerAsync(string id, Owner owner) =>
        await _colection.ReplaceOneAsync(x => x._id == id, owner);
    public async Task RemoveOwnerAsync(string id) =>
        await _colection.DeleteOneAsync(x => x._id == id);
}