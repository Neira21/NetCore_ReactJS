using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public DbSet<GestoresBD> gestores_basedatos { get; set; }
    }
}
