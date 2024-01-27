using Microsoft.EntityFrameworkCore;
using movies.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

DotNetEnv.Env.Load();

// Retrieve environment variables
var PGHOST = Environment.GetEnvironmentVariable("PGHOST");
var PGDATABASE = Environment.GetEnvironmentVariable("PGDATABASE");
var PGUSER = Environment.GetEnvironmentVariable("PGUSER");
var PGPASSWORD = Environment.GetEnvironmentVariable("PGPASSWORD");

// Build connection string
var connectionString = $"Host={PGHOST};Database={PGDATABASE};Username={PGUSER};Password={PGPASSWORD}";

// Add services to the container.
var services = new ServiceCollection();

// Add database context
services.AddDbContext<DatabaseContext>(
    opt =>
    {
      opt.UseNpgsql(connectionString);
      if (builder.Environment.IsDevelopment())
      {
        opt
          .LogTo(Console.WriteLine, LogLevel.Information)
          .EnableSensitiveDataLogging()
          .EnableDetailedErrors();
      }
    }
);

app.MapGet("/", () => "Hello World!");

app.Run();
