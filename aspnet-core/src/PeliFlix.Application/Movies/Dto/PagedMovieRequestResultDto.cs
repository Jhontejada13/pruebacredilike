using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies.Dto
{
    public class PagedMovieRequestResultDto : PagedResultRequestDto
    {
        public string keyword { get; set; } //Para filtrar y buscar por algún campo ... 
    }
}
