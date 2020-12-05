using Abp.Application.Services;
using PeliFlix.Entities;
using PeliFlix.Genders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Genders
{
    public interface IGenderAppService : IAsyncCrudAppService<GenderDto, int, PagedGenderRequestResultDto, CreateGenderDto, GenderDto>
    {
    }
}
