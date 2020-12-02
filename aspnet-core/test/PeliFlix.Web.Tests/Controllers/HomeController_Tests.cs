using System.Threading.Tasks;
using PeliFlix.Models.TokenAuth;
using PeliFlix.Web.Controllers;
using Shouldly;
using Xunit;

namespace PeliFlix.Web.Tests.Controllers
{
    public class HomeController_Tests: PeliFlixWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}