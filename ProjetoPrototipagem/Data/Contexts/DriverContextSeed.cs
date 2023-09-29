using Microsoft.EntityFrameworkCore;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Contexts
{
    public static class DriverContextSeed
    {
        public static void SeedAsync(DatabaseContext context)
        {
            try
            {
                context.Database.Migrate();

            }
            catch
            {

            }

            if (!context.Drivers.Any())
            {
                var InventoryItems = new List<Driver>
                {
                    new Driver
                    {
                        Name = "Thales Luiz",
                        DocumentNumber = "123"
                    },
                    new Driver
                    {
                        Name = "Luiz Eduardo",
                        DocumentNumber = "4321"
                    }
                };
                context.Drivers.AddRange(InventoryItems);
                context.SaveChanges();
            }

        }
    }
}
