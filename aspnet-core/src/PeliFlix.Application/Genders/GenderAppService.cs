using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using PeliFlix.Entities;
using PeliFlix.Genders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliFlix.Genders
{
    public class GenderAppService : AsyncCrudAppService<Gender, GenderDto, int , PagedGenderRequestResultDto, CreateGenderDto, GenderDto>, IGenderAppService
    {
        private readonly IRepository<Gender, int> _GenderRepository;

        public GenderAppService(IRepository<Gender> genderRepository)
            : base(genderRepository)
        {
            _GenderRepository = genderRepository;
        }

        public override async Task<GenderDto> CreateAsync(CreateGenderDto input)
        {
            var gender = await _GenderRepository.FirstOrDefaultAsync(m => m.Name == input.Name);
            if (gender != null)
            {
                throw new UserFriendlyException("There is already a gender with given name");
            }

            gender = new Gender()
            {
                Name = input.Name
            };
            await _GenderRepository.InsertAsync(gender);

            return MapToEntityDto(gender);
        }

        public override async Task<GenderDto> UpdateAsync(GenderDto input)
        {
            var gender = await _GenderRepository.FirstOrDefaultAsync(m => m.Id == input.Id);

            if (gender == null)
            {
                throw new UserFriendlyException("This Movie doesn't exist");
            }

            gender.Name = input.Name;
            gender.Id = input.Id;
            await _GenderRepository.UpdateAsync(gender);

            return await GetAsync(input);
        }

        public override async Task DeleteAsync(EntityDto<int> input)
        {
            var movie = await _GenderRepository.GetAsync(input.Id);
            await _GenderRepository.DeleteAsync(movie);
        }

    }
}
