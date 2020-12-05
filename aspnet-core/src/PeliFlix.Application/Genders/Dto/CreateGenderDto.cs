using Abp.AutoMapper;
using PeliFlix.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Genders.Dto
{
    [AutoMapTo(typeof(Gender))]
    public class CreateGenderDto
    {
        [Required]
        public string Name { get; set; }
    }
}
