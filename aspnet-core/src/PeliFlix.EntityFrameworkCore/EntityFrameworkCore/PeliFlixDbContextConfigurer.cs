using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace PeliFlix.EntityFrameworkCore
{
    public static class PeliFlixDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<PeliFlixDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<PeliFlixDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
