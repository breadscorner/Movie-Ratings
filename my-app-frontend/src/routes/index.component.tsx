// routes/IndexComponent.tsx
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdAt: string;
};

export const component = function CreatePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchmovies() {
      const response = await fetch("/api/Movies");
      const data = await response.json();
      setMovies(data);
    }
    fetchmovies();
  }, []);

  return (
    <>
      <h1>Movie Ratings</h1>
      <h2>Here's my list of Movies</h2>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Rated: {movie.rating}/5</p>
        </div>
      ))}
    </>
  );
};
