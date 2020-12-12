using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using PeliFlix.Entities;
using PeliFlix.Movies.Dto;
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
        private readonly IRepository<Movie> _MovieRepository;
        private readonly IRepository<Gender> _GenderRepository;

        public MovieSeenAppService(IRepository<Movie_Seen> movieSeenRepository, IRepository<Movie> movieRepository
            , IRepository<Gender> genderRepository) 
            : base(movieSeenRepository)
        {
            _MovieSeenRepository = movieSeenRepository;
            _MovieRepository = movieRepository;
            _GenderRepository = genderRepository;
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

        public async Task<Movie_SeenDto> GetInfoMovieSeen(int IdMovieSeen, int idMovie)
        {
            var movieInfoDto = new Movie_SeenDto();

            var getInfoMovie = await _MovieRepository.FirstOrDefaultAsync(m => m.Id == idMovie);
            var getInfoMovieSeen = await _MovieSeenRepository.FirstOrDefaultAsync(ms => ms.Id == IdMovieSeen);

            if (getInfoMovie == null || getInfoMovieSeen == null)
            {
                throw new UserFriendlyException("Sorry, this movie dosen´t found");
            }

            movieInfoDto.TitleMovie = getInfoMovie.Title;
            movieInfoDto.SynopsisMovie = getInfoMovie.Synopsis;
            movieInfoDto.DirectorMovie = getInfoMovie.Director;
            movieInfoDto.MovieYear = getInfoMovie.year;
            movieInfoDto.MovieId = getInfoMovie.Id;            

            movieInfoDto.viewDate = getInfoMovieSeen.View_Date;
            movieInfoDto.Score = getInfoMovieSeen.Score;
            movieInfoDto.UserId = getInfoMovieSeen.UserId;

            return movieInfoDto;
        }

        public async Task<ListResultDto<Movie_SeenDto>> GetAllMoviesAsync()
        {
            
            var completMovieInfo = from ms in await _MovieSeenRepository.GetAllListAsync()
                                   join m in await _MovieRepository.GetAllListAsync()
                                   on ms.MovieId equals m.Id
                                   join g in await _GenderRepository.GetAllListAsync()
                                   on m.GenderId equals g.Id
                                    select new Movie_SeenDto
                                    {
                                        TitleMovie = m.Title,
                                        SynopsisMovie = m.Synopsis,
                                        DirectorMovie = m.Director,
                                        MovieYear = m.year,
                                        MovieId = m.Id,
                                        GenderMovie = g.Name,

                                        Id = ms.Id,
                                        UserId = ms.UserId,
                                        View = ms.View,
                                        viewDate = ms.View_Date,
                                        Score = ms.Score
                                    };
            return new ListResultDto<Movie_SeenDto>(ObjectMapper.Map<List<Movie_SeenDto>>(completMovieInfo));            
            
        }
         
    }
}
