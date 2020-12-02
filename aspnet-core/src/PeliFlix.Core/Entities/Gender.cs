using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Entities
{
    public class Gender : Entity
    {
        public string Name { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
