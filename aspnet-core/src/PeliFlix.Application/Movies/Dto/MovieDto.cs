using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies.Dto
{
    [AutoMapFrom(typeof(Movie))]
    public class MovieDto : EntityDto
    {
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public int year { get; set; }
        public string Director { get; set; }

        public int GenderId { get; set; }
        public string MovieName { get; set; }

    }
}
