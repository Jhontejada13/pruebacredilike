using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PeliFlix.EntityFrameworkCore;
using PeliFlix.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace PeliFlix.Web.Tests
{
    [DependsOn(
        typeof(PeliFlixWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class PeliFlixWebTestModule : AbpModule
    {
        public PeliFlixWebTestModule(PeliFlixEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PeliFlixWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(PeliFlixWebMvcModule).Assembly);
        }
    }
}