using Abp.AutoMapper;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies_Seen.Dto
{
    [AutoMapTo(typeof(Movie_Seen))]
    public class CreateMovie_SeenDto
    {
        [Required]
        public bool View { get; set; }

        [Required]
        public DateTime viewDate { get; set; }

        [Required]
        public decimal Score { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
