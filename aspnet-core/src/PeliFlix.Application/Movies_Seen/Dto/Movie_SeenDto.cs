using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies_Seen.Dto
{
    [AutoMapFrom(typeof(Movie_Seen))]
    public class Movie_SeenDto : EntityDto
    {
        public bool View { get; set; }
        public DateTime viewDate { get; set; }
        public decimal Score { get; set; }

        public int MovieId { get; set; }
        public int UserId { get; set; }
    }
}
