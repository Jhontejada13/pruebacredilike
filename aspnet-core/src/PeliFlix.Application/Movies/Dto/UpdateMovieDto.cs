using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies.Dto
{
    public class UpdateMovieDto : CreateMovieDto
    {
        public int Id { get; set; }
    }
}
