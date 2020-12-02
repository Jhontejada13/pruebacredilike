using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies.Dto
{
    [AutoMapper(typeof(Movies))]
    public class MovieDto : EntityDto
    {
    }
}
