using Abp.AutoMapper;
using Abp.Runtime.Validation;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies.Dto
{
    [AutoMapTo(typeof(Movie))]
    public class CreateMovieDto : IShouldNormalize  
    {

        [Required]
        public string Title { get; set; }

        [Required]
        public string Synopsis { get; set; }

        [Required]
        public int year { get; set; }

        [Required]
        public string Director { get; set; }

        [Required]
        public int GenderId { get; set; }

        public string[] GendersName { get; set; }

        public bool isView { get; set; }

        public void Normalize()
        {
            if (GendersName == null)
            {
                GendersName = new string[0];
            }
        }
    }
}
