using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using ProjetoPrototipagem.Domain.Entitites;

namespace ProjetoPrototipagem.Data.Contexts
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> dbContextOptions) : base(dbContextOptions)
        {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect()) databaseCreator.Create();
                    if (databaseCreator.HasTables()) databaseCreator.CreateTables();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<LicensePlate> LicensePlates { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddBase<Driver>();
            var builder = modelBuilder.Entity<Driver>();
            builder.Property(c => c.Name)
                .IsRequired();
            builder.Property(c => c.DocumentNumber)
                .IsRequired();


        }
    }
}
