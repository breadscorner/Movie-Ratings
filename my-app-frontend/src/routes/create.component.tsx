import { useState } from "react";
import "../App.css";

type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    createdAt: string;
};

export default function App() {

    const [movie, setMovie] = useState<Movie | null>(null);
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [year, setYear] = useState(0);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const response = await fetch("/api/Movies");
        const data = await response.json();
        console.log(data.length)

        const result = await fetch("/api/Movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data.length + 1, title: title, rating: rating, year: year }),
        })


        const movieId = data.length + 1
        const movieTitle = data.length + 1
        const movieRating = data.length + 1
        const movieYear = data.length + 1

        setMovie({
            id: movieId,
            title: movieTitle,
            year: movieRating,
            rating: movieYear,
            createdAt: ""
        })

        const databody = result.json()
        console.log(databody)
    }

    return (
        <>
            <h2>Add a Movie</h2>
            <p>{movie ? `${movie} was added` : null}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                <input type="number" name="rating" placeholder="rating" onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="number" name="year" placeholder="year" onChange={(e) => setYear(parseInt(e.target.value))} />
                <button type="submit">Add Movie</button>
            </form>
        </>
    );

}