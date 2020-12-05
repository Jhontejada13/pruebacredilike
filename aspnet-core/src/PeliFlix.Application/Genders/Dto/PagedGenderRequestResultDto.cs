using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Genders.Dto
{
    public class PagedGenderRequestResultDto : PagedResultRequestDto
    {
        public string keyword { get; set; }
    }
}
