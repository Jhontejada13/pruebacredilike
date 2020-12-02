using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PeliFlix.Configuration;
using PeliFlix.Web;

namespace PeliFlix.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class PeliFlixDbContextFactory : IDesignTimeDbContextFactory<PeliFlixDbContext>
    {
        public PeliFlixDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PeliFlixDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            PeliFlixDbContextConfigurer.Configure(builder, configuration.GetConnectionString(PeliFlixConsts.ConnectionStringName));

            return new PeliFlixDbContext(builder.Options);
        }
    }
}
