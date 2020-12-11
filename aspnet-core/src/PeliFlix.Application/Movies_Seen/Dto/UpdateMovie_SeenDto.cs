using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Movies_Seen.Dto
{
    public class UpdateMovie_SeenDto : CreateMovie_SeenDto
    {
        public int Id { get; set; }
    }
}
