using MongoDB.Driver;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Seeds
{
    public static class SeedLicensePlateDb
    {
        public static void SeedData(IMongoCollection<LicensePlate> collection)
        {
            var dbExists = collection.Find(p => true).Any();
            if (!dbExists)
            {
                collection.InsertManyAsync(GetInicialLicensePlates());
            }
        }

        private static IEnumerable<LicensePlate> GetInicialLicensePlates()
        {
            return new List<LicensePlate>()
            {
                new LicensePlate()
                {
                },

                new LicensePlate()
                {
                }
            };
        }
    }
}
