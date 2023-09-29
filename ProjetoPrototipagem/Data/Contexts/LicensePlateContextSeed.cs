using Microsoft.EntityFrameworkCore;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Contexts
{
    public static class LicensePlateContextSeed
    {
        public static void SeedAsync(LicensePlateContext context)
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
                var InventoryItems = new List<LicensePlate>
                {
                    new LicensePlate
                    {
                        Owner = 1,
                        Driver = "123",
                        Number = "123AA123"
                    },
                    new LicensePlate
                    {
                        Owner = 2,
                        Driver = "4321",
                        Number = "73456A12"
                    }
                };
                context.Drivers.AddRange(InventoryItems);
                context.SaveChanges();
            }

        }
    }
}
