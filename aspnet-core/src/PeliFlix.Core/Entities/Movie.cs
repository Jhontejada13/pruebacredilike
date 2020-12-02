using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Entities
{
    public class Movie : Entity
    {

        public Movie() { }

        public string Title { get; set; }
        public string Synopsis { get; set; }
        public int year { get; set; }
        public string Director { get; set; }

        public int GenderId { get; set; }
        public Gender Gender { get; set; }

        public ICollection<Movie_Seen> Movies_Seen { get; set; }
    }
}
