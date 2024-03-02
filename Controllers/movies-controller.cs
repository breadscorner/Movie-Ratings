using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movies.Models;
// using Microsoft.AspNetCore.SignalR;
// using movies.Hubs;

namespace movies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
  private readonly DatabaseContext _context;

  public MoviesController(DatabaseContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MovieList>>> GetMovieItems(int? starRating)
  {
    if (starRating.HasValue)
    {
      return await _context.MovieLists.Where(t => t.rating >= starRating).ToListAsync();
    }
    return await _context.MovieLists.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<MovieList>> GetMovieItem(int id)
  {
    var movieItem = await _context.MovieLists.FindAsync(id);

    if (movieItem == null)
    {
      return NotFound();
    }

    return movieItem;
  }

  [HttpPost]
  public async Task<ActionResult<MovieList>> PostMovieItem(MovieList movie)
  {
    _context.MovieLists.Add(movie);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetMovieItem), new { id = movie.Id }, movie);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> PutMovieItem(int id, MovieList movie)
  {
    if (id != movie.Id)
    {
      return BadRequest();
    }

    _context.Entry(movie).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteTodoItem(int id)
  {
    var movieItem = await _context.MovieLists.FindAsync(id);
    if (movieItem == null)
    {
      return NotFound();
    }

    _context.MovieLists.Remove(movieItem);
    await _context.SaveChangesAsync();

    return NoContent();
  }
}