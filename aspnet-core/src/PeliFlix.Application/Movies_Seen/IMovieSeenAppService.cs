using Abp.Application.Services;
using PeliFlix.Movies_Seen.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies_Seen
{
    public interface IMovieSeenAppService : IAsyncCrudAppService<Movie_SeenDto, int, PagedMovieSeenRequestResultDto, 
        CreateMovie_SeenDto, Movie_SeenDto>
    {
    }
}
