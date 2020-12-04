using Abp.Application.Services;
using PeliFlix.Entities;
using PeliFlix.Movies.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies
{
    //public interface IMovieAppService : IApplicationService
    public interface IMovieAppService : IAsyncCrudAppService<MovieDto, int, PagedMovieRequestResultDto, CreateMovieDto, MovieDto>
    {
        //Task<List<Movie>> GetAll();

        //Task<Movie> GetOneMovie(Movie movie);
        //List<MovieDto> GetAll();
    }
}
