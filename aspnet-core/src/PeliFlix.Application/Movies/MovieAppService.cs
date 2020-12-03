using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PeliFlix.Entities;
using PeliFlix.Movies.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies
{
    public class MovieAppService : PeliFlixAppServiceBase, IMovieAppService
    {
        private readonly IRepository<Movie> _MovieRepository;

        public MovieAppService(IRepository<Movie> MovieRepository)
        {
            _MovieRepository = MovieRepository;
        }

        public async Task<List<Movie>> GetAll()
        {
            var movies = await _MovieRepository
                .GetAll().OrderBy(m => m.Title)
                .ToListAsync();

            return movies;
        }


    }
}
