using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using PeliFlix.Authorization.Roles;
using PeliFlix.Authorization.Users;
using PeliFlix.MultiTenancy;
using PeliFlix.Entities;

namespace PeliFlix.EntityFrameworkCore
{
    public class PeliFlixDbContext : AbpZeroDbContext<Tenant, Role, User, PeliFlixDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Movie_Seen> Movie_Seen { get; set; }
        
        public PeliFlixDbContext(DbContextOptions<PeliFlixDbContext> options)
            : base(options)
        {
        }
    }
}
