﻿using System.Threading.Tasks;
using Abp.Application.Services;
using PeliFlix.Authorization.Accounts.Dto;

namespace PeliFlix.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
