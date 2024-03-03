namespace movies.Models;

public class Likes
{
    public int Id { get; set; }
    public int MovieId { get; set; } 
    public bool Liked { get; set; } = false;
}