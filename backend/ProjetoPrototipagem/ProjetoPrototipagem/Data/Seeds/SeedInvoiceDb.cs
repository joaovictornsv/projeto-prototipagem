using MongoDB.Driver;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Seeds
{
    public static class SeedInvoiceDb
    {
        public static void SeedData(IMongoCollection<Invoice> collection)
        {
            var dbExists = collection.Find(p => true).Any();
            if (!dbExists)
            {
                collection.InsertManyAsync(GetInicialInvoices());
            }
        }

        private static IEnumerable<Invoice> GetInicialInvoices()
        {
            return new List<Invoice>()
            {
                new Invoice()
                {
                },

                new Invoice()
                {
                }
            };
        }
    }
}
