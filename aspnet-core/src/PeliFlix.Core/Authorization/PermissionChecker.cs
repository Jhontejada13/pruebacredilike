using Abp.Authorization;
using PeliFlix.Authorization.Roles;
using PeliFlix.Authorization.Users;

namespace PeliFlix.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
