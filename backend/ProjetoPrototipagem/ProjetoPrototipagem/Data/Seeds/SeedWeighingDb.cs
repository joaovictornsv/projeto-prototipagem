using MongoDB.Driver;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Seeds
{
    public static class SeedWeighingDb
    {
        public static void SeedData(IMongoCollection<Weighing> collection)
        {
            var dbExists = collection.Find(p => true).Any();
            if (!dbExists)
            {
                collection.InsertManyAsync(GetInicialWeighings());
            }
        }

        private static IEnumerable<Weighing> GetInicialWeighings()
        {
            return new List<Weighing>()
            {
                new Weighing()
                {
                    
                },

                new Weighing()
                {
                }
            };
        }
    }
}
