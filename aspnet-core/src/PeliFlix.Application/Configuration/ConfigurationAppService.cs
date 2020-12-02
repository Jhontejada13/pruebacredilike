using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using PeliFlix.Configuration.Dto;

namespace PeliFlix.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : PeliFlixAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
