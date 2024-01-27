namespace movies.Models;

public class MovieList
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required int rating { get; set; }
    public int Year { get; set; }
    public DateTime CreatedAt { get; set; }
}
