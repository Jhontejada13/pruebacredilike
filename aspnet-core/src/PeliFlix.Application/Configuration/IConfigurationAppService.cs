using System.Threading.Tasks;
using PeliFlix.Configuration.Dto;

namespace PeliFlix.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
