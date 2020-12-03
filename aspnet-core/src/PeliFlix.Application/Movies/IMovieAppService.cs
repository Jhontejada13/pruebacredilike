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
    public interface IMovieAppService : IApplicationService
    {
        Task<List<Movie>> GetAll();
        //List<MovieDto> GetAll();
    }
}
