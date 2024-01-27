using Microsoft.EntityFrameworkCore;

namespace movies.Models
{
  public class DatabaseContext : DbContext
  {
     public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<MovieList> MovieList => Set<MovieList>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<MovieList>()
          .Property(e => e.CreatedAt)
          .HasDefaultValueSql("now()");
    }
  }
}
