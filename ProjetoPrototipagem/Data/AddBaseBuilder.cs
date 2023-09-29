using Microsoft.EntityFrameworkCore;
using ProjetoPrototipagem.Domain.Entitites.Common;

namespace ProjetoPrototipagem.Data
{
    public static class AddBaseBuilder
    {
        public static void AddBase<T>(this ModelBuilder modelBuilder) where T : Base
        {
            var builder = modelBuilder.Entity<T>();
            builder.HasKey(x => x.Id);
        }
    }
}
