import "./App.css";
import { useState, useEffect } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
};

export default function App() {
  const [post, setPost] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    }
    fetchTodos();
    console.log("Hello");
  }, [post]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPost(true)
    const response = await fetch("/api/Movies");
    const data = await response.json();

    const result = await fetch("/api/Movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.length + 1, title: title, rating: rating, year: year }),
    })
    const databody = result.json()
    console.log(databody)
    setPost(false);
  }

  return (
    <>
      <h1>Movie Ratings</h1>

      {/* List all movies */}
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <div>
            <p>{movie.year}</p>
            <p>Rating is {movie.rating} / 5</p>
          </div>
        </div>
      ))}

      {/* Add a movie */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="rating"
          placeholder="rating"
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
        <input
          type="number"
          name="year"
          placeholder="year"
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
}
