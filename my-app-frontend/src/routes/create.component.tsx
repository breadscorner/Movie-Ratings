import { useMutation } from '@tanstack/react-query'
import { useState } from "react";
import "../App.css";

type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    createdAt: string;
};

export const component = function Home() {

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [year, setYear] = useState(0);

const { error, isPending, mutateAsync } = useMutation({
        mutationKey: ["movies"],
        mutationFn: async ({ title, year, rating }: Movie) => {
            const data = await fetch("/api/Movies");
            const databody = await data.json();

            const response = await fetch("/api/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: databody.length + 1, title, year, rating }),
            });
            return response.json();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutateAsync({
                id: 0,
                title: title,
                rating: rating,
                year: year,
                createdAt: ""
            });
            // Reset form fields after successful submission
            setTitle("");
            setRating(0);
            setYear(0);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

   return (
        <div className="m-4">
            <h1 className="text-4xl mb-10">Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" name="rating" placeholder="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="number" name="year" placeholder="year" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
                <button type="submit" disabled={isPending}>Add Movie</button>
            </form>
            {isPending && <p>Loading...</p>}
            {error && <p>Error: try again later</p>}
        </div>
    );

}