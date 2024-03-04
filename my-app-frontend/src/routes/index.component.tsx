import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useSignalR from "../useSignalR";
import { fetchMovies } from "../network";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdAt: string;
};

export const component = function CreatePage() {
  const { connection } = useSignalR("/r/MovieHub");

  useEffect(() => {
    if (connection) {
      connection.on("MovieAdded", (movie: Movie) => {
        console.log("MovieAdded", movie);
        // Handle the received movie data here
      });
    }
  }, [connection]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (confirmDelete) {
      console.log("delete");
      fetch(`/api/movies/${id}`, {
        method: "DELETE",
      })
        .then(response => {
          if (response.ok) {
            // Remove the deleted movie from the local state or refetch the movie list
          } else {
            // Handle deletion error
          }
        })
        .catch(error => {
          console.error("Error deleting movie:", error);
        });
    }
  };

  const { isPending, error, data: movies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (connection) {
      connection.on("MovieAdded", (movie: Movie) => {
        console.log("MovieAdded", movie);      });
    }
    return () => {
      if (connection) {
        connection.off("MovieAdded");
      }
    };
  }, [connection]);

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
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))
      )}
    </>
  );
};