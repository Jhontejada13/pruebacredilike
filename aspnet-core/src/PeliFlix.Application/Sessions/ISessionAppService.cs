using System.Threading.Tasks;
using Abp.Application.Services;
using PeliFlix.Sessions.Dto;

namespace PeliFlix.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
