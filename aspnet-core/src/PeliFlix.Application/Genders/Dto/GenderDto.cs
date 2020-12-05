using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Genders.Dto
{
    [AutoMapFrom(typeof(Gender))]
    public class GenderDto : EntityDto
    {
        public string Name { get; set; }
    }
}
