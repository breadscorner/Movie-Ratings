using Microsoft.EntityFrameworkCore;
using movies.Models;
using Microsoft.AspNetCore.SignalR;
using movies.Hubs;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var PGHOST = Environment.GetEnvironmentVariable("PGHOST");
if (string.IsNullOrEmpty(PGHOST))
{
    throw new Exception("PGHOST environment variable is not set or is empty.");
}

var PGDATABASE = Environment.GetEnvironmentVariable("PGDATABASE");
var PGUSER = Environment.GetEnvironmentVariable("PGUSER");
var PGPASSWORD = Environment.GetEnvironmentVariable("PGPASSWORD");


var connectionString = $"Host={PGHOST};Database={PGDATABASE};Username={PGUSER};Password={PGPASSWORD}";

builder.Services.AddDbContext<DatabaseContext>(
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

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapGet("/", () => "Hello World!");
app.MapFallbackToFile("index.html");

app.Run();