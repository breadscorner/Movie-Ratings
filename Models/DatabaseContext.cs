using Microsoft.EntityFrameworkCore;
using movies.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<MovieList> MovieLists { get; set; }
    public DbSet<Likes> Likes { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieList>()
            .Property(e => e.CreatedAt)
            .HasDefaultValueSql("now()");
    }
}

