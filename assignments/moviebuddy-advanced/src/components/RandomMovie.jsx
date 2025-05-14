import { useState } from 'react';

export default function RandomMovie({ movies, addMovie }) {
    const [movieIndex, setMovieIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    function toggleDetails() {
        setShowDetails((prev) => !prev);
    }

    function nextMovie(direction) {
        setMovieIndex((prev) => {
            const newIndex = prev + direction;
            return newIndex >= 0 && newIndex < movies.length ? newIndex : prev;
        });
    }

    function getRandomMovie() {
        setMovieIndex(Math.floor(Math.random() * movies.length));
    }

    if (movies.length === 0) return <p className="p-4">No movies found.</p>;

    const currentMovie = movies[movieIndex];

    return (
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow">
            <h2 className="text-xl font-semibold">{currentMovie.title}</h2>
            {showDetails && (
                <>
                    <p>Description: {currentMovie.description}</p>
                    <p>Rating: {currentMovie.rating}</p>
                </>
            )}
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => nextMovie(-1)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Prev
                </button>
                <button
                    onClick={() => nextMovie(1)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Next
                </button>
                <button
                    onClick={getRandomMovie}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Random
                </button>
                <button
                    onClick={toggleDetails}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
                <button
                    onClick={() => addMovie(currentMovie)}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                    Add to Favorites
                </button>
            </div>
        </div>
    );
}
