using Microsoft.IdentityModel.Tokens;
using ProjetoPrototipagem.Data.Contexts;

namespace ProjetoPrototipagem.Data
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<DatabaseContext>();
                DriverContextSeed.SeedAsync(context);
            }
        }
    }
}
