using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using PeliFlix.Entities;
using PeliFlix.Movies_Seen.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies_Seen
{
    public class MovieSeenAppService : AsyncCrudAppService<Movie_Seen, Movie_SeenDto, int, PagedMovieSeenRequestResultDto,
        CreateMovie_SeenDto, Movie_SeenDto>, IMovieSeenAppService
    {
        private readonly IRepository<Movie_Seen> _MovieSeenRepository;

        public MovieSeenAppService(IRepository<Movie_Seen> movieSeenRepository) : base(movieSeenRepository)
        {
            _MovieSeenRepository = movieSeenRepository;
        }

        public override async Task<Movie_SeenDto> CreateAsync(CreateMovie_SeenDto input)
        {
            var movie_seen = await _MovieSeenRepository.FirstOrDefaultAsync(m => m.MovieId == input.MovieId);
            if (movie_seen != null)
            {
                throw new UserFriendlyException("This movie doesn't exist");
            }

            movie_seen = new Movie_Seen()
            {
                MovieId = input.MovieId,
                UserId = input.UserId,
                View = input.View,
                View_Date = input.viewDate,
                Score = input.Score
            };
            await _MovieSeenRepository.InsertAsync(movie_seen);

            return MapToEntityDto(movie_seen);
        }

        public override async Task<Movie_SeenDto> UpdateAsync(Movie_SeenDto input)
        {
            var movieSeen = await _MovieSeenRepository.FirstOrDefaultAsync(m => m.Id == input.Id);

            if (movieSeen == null)
            {
                throw new UserFriendlyException("You haven't seen this movie");
            }

            movieSeen.MovieId = input.MovieId;
            movieSeen.UserId = input.UserId;
            movieSeen.View = input.View;
            movieSeen.View_Date = input.viewDate;
            movieSeen.Score = input.Score;
            await _MovieSeenRepository.UpdateAsync(movieSeen);

            return await GetAsync(input);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            var movieSeen = await _MovieSeenRepository.GetAsync(input.Id);
            await _MovieSeenRepository.DeleteAsync(movieSeen);   
        }
    }
}
