using Abp.Application.Services;
using Abp.Domain.Repositories;
using PeliFlix.Entities;
using PeliFlix.Movies.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies
{
    public class MovieAppService : CrudAppService<Movie, MovieDto>
    {
        public MovieAppService(IRepository<Movie> repository): base(repository)
        {

        }
    }
}
