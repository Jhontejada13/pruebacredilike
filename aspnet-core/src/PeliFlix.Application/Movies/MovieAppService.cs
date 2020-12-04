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

        //public override async Task<MovieDto> CreateAsync(CreateMovieDto input)
        //{
        //    var movie = _MovieRepository.FirstOrDefault(m => m.Title == input.Title);
        //    if (movie != null)
        //    {
        //        throw new UserFriendlyException("There is already a movei with given title");
        //    }

        //    movie = new Movie() { Title = input.Title, Director = input.Director, Synopsis = input.Synopsis, year = input.year };
        //    _MovieRepository.Insert(movie);

        //    return MapToEntityDto(movie);
        //}

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            var movie = await _MovieRepository.GetAsync(input.Id);
            await _MovieRepository.DeleteAsync(movie);
        }

        //public async Task<PagedResultDto<MovieDto>> GetAllAsync()
        //{
        //    var movies = await _MovieRepository.GetAllListAsync();
        //    return new PagedResultDto<MovieDto>(movies.Count, ObjectMapper.Map<List<MovieDto>>(movies));
        //}



        //public async Task<ListResultDto<MovieDto>> GetMovies()
        //{
        //    var movies = await _MovieRepository.GetAllListAsync();
        //    return new ListResultDto<MovieDto>(ObjectMapper.Map<List<MovieDto>>(movies));
        //}


        //public async Task<List<Movie>> GetAll()
        //{
        //    var movies = await _MovieRepository
        //        .GetAll().OrderBy(m => m.Title)
        //        .ToListAsync();

        //    return movies;
        //}

        //public async Task<Movie> GetOneMovie(Movie movie)
        //{
        //    return await _MovieRepository.FirstOrDefaultAsync(m => m.Id == movie.Id);
        //}
    }
}
