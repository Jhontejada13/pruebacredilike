using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PeliFlix.Configuration;

namespace PeliFlix.Web.Host.Startup
{
    [DependsOn(
       typeof(PeliFlixWebCoreModule))]
    public class PeliFlixWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public PeliFlixWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PeliFlixWebHostModule).GetAssembly());
        }
    }
}
