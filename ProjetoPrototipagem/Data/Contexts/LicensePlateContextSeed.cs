using Microsoft.EntityFrameworkCore;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Contexts
{
    public static class LicensePlateContextSeed
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
                var LicensePlates = new List<LicensePlate>
                {
                    new LicensePlate
                    {
                    },
                    new LicensePlate
                    {
                    }
                };
                context.LicensePlates.AddRange(LicensePlates);
                context.SaveChanges();
            }

        }
    }
}
