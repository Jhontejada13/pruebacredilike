using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PeliFlix.Authorization;
using PeliFlix.Entities;
using PeliFlix.Movies.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies
{
    //public class MovieAppService : PeliFlixAppServiceBase, IMovieAppService
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class MovieAppService : AsyncCrudAppService<Movie, MovieDto, int, PagedMovieRequestResultDto, CreateMovieDto, MovieDto>, IMovieAppService
    {
        private readonly IRepository<Movie, int> _MovieRepository;

        public MovieAppService(IRepository<Movie> movieRepository)
             : base(movieRepository)
        {
            _MovieRepository = movieRepository;
        }

        public override async Task<MovieDto> CreateAsync(CreateMovieDto input)
        {
            var movie = await _MovieRepository.FirstOrDefaultAsync(m => m.Title == input.Title);
            if (movie != null)
            {
                throw new UserFriendlyException("There is already a movei with given title");
            }

            movie = new Movie() { Title = input.Title, Director = input.Director, Synopsis = input.Synopsis, year = input.year, 
                GenderId = input.GenderId };
            await _MovieRepository.InsertAsync(movie);

            return MapToEntityDto(movie);            
        }

        public override async Task<MovieDto> UpdateAsync(MovieDto input)
        {
            var movie = await _MovieRepository.FirstOrDefaultAsync(m => m.Id == input.Id);

            if (movie == null)
            {
                throw new UserFriendlyException("This Movie doesn't exist");
            }

            movie.Director = input.Director;
            movie.year = input.year;
            movie.Synopsis = input.Synopsis;
            movie.Title = input.Title;
            movie.GenderId = input.GenderId;
            await _MovieRepository.UpdateAsync(movie);

            return await GetAsync(input);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            var movie = await _MovieRepository.GetAsync(input.Id);
            await _MovieRepository.DeleteAsync(movie);
        }
      
    }
}
