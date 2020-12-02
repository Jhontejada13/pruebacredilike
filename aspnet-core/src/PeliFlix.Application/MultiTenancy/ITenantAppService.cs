using Abp.Application.Services;
using PeliFlix.MultiTenancy.Dto;

namespace PeliFlix.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

