import "./App.css";
import { useState, useEffect } from "react";

type Movie = {
  id: number;
  title: string;
  description: string;
};

export default function App() {
  const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
      console.log(data, 1);
    }
    fetchTodos();
    console.log("Hello");
  }, []);

  return (
    <>
      <p>Hello</p>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
          <p>{movie.description}</p>
        </div>
      ))}
    </>
  );
}
