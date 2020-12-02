using System.ComponentModel.DataAnnotations;

namespace PeliFlix.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}