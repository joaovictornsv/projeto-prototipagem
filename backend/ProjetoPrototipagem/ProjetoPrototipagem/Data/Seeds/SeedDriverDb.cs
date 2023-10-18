using MongoDB.Driver;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Seeds
{
    public static class SeedDriverDb
    {
        public static void SeedData(IMongoCollection<Driver> collection)
        {
            var dbExists = collection.Find(p => true).Any();
            if(!dbExists)
            {
                collection.InsertManyAsync(GetInicialDrivers());
            }
        }

        private static IEnumerable<Driver> GetInicialDrivers()
        {
            return new List<Driver>()
            {
                new Driver() 
                {
                     Name = "Thales",
                     DocumentNumber = "123",
                },
                
                new Driver() 
                {
                     Name = "Luiz",
                     DocumentNumber = "4321",
                }
            };
        }
    }
}
