import React, { useEffect } from "react";
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

const CreatePage: React.FC = () => {
  const { connection } = useSignalR("/r/MovieHub");

  useEffect(() => {
    if (connection) {
      // Subscribe to the "MovieAdded" event when the connection is established
      connection.on("MovieAdded", (movie: Movie) => {
        console.log("MovieAdded", movie);
        // You can update the UI to reflect the added movie here
        // For simplicity, let's refetch the movie list
        refetchMovies();
      });
    }

    return () => {
      if (connection) {
        // Clean up the event listener when the component unmounts or the connection is lost
        connection.off("MovieAdded");
      }
    };
  }, [connection]);

  const {
    isPending,
    error,
    data: movies,
    refetch: refetchMovies,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      console.log("delete");
      fetch(`/api/movies/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            if (connection) {
              // Invoke "MovieDeleted" event when the movie is successfully deleted
              connection.invoke("MovieDeleted", id);
            }
          } else {
            // Handle deletion error
          }
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
        });
    }
  };

  return (
    <>
      <h1>Movie Ratings</h1>
      <h2>Here's my list of Movies</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
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

export default CreatePage;
