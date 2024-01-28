// routes/IndexComponent.tsx
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchMovies } from "../network";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdAt: string;
};

export const component = function CreatePage() {
  const { isPending, error, data:movies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  return (
    <>
      <h1>Movie Ratings</h1>
      <h2>Here's my list of Movies</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: try again later</p>
      ) : (
        movies.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Rated: {movie.rating}/5</p>
          </div>
        ))
      )}
    </>
  );
};
