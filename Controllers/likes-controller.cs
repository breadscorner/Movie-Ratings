using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR; 
using movies.Models;
using movies.Hubs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace movies.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IHubContext<LikeHub> _hubContext;

        public LikesController(DatabaseContext context, IHubContext<LikeHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Likes>>> GetLikes()
        {
            return await _context.Likes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Likes>> GetLike(int id)
        {
            var like = await _context.Likes.FindAsync(id);

            if (like == null)
            {
                return NotFound();
            }

            return like;
        }

        [HttpPost]
        public async Task<ActionResult<Likes>> PostLike(Likes like)
        {
            if (like == null)
            {
                return BadRequest();
            }

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            // Notify clients about the new like
            await _hubContext.Clients.All.SendAsync("ReceiveLike", like);

            return CreatedAtAction(nameof(GetLike), new { id = like.Id }, like);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLike(int id, Likes like)
        {
            if (id != like.Id)
            {
                return BadRequest();
            }

            _context.Entry(like).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            var like = await _context.Likes.FindAsync(id);
            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
