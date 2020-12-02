using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace PeliFlix.Controllers
{
    public abstract class PeliFlixControllerBase: AbpController
    {
        protected PeliFlixControllerBase()
        {
            LocalizationSourceName = PeliFlixConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
