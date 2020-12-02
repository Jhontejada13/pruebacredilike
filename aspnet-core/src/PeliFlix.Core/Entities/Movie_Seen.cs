using Abp.Domain.Entities;
using PeliFlix.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Entities
{
    public class Movie_Seen : Entity
    {
        public bool View { get; set; }
        public DateTime View_Date { get; set; }
        public decimal Score { get; set; }

        //Relación con la tabla User
        public int UserId { get; set; }
        public User User { get; set; }

        //Relación con la tabla Movie
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
