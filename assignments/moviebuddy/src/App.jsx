import { useState } from 'react';
import movies from './movies';
import './styles.css';

function nextMovie(currentIndex, direction, arrayLength) {
    if (arrayLength === 0) return 0;
    if (direction === 'random') return Math.floor(Math.random() * arrayLength);
    if (direction === 'next') return (currentIndex + 1) % arrayLength;
    if (direction === 'previous')
        return (currentIndex - 1 + arrayLength) % arrayLength;
    return currentIndex;
}

function App() {
    const [movieIndex, setMovieIndex] = useState(0);
    const [favorites, setFavorites] = useState([]);

    const handleNavigation = (direction) => {
        setMovieIndex((prev) => nextMovie(prev, direction, movies.length));
    };

    const handleAddFavorite = () => {
        const movie = movies[movieIndex];
        if (!favorites.some((fav) => fav.title === movie.title)) {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    const handleRemoveFavorite = (index) => {
        setFavorites((prev) => prev.filter((_, i) => i !== index));
    };

    const movie = movies[movieIndex];

    return (
        <div className="app">
            <h1>MovieBuddy</h1>
            <div className="controls">
                <button onClick={() => handleNavigation('random')}>
                    Random Movie
                </button>
                <button onClick={() => handleNavigation('previous')}>
                    Previous
                </button>
                <button onClick={() => handleNavigation('next')}>Next</button>
                <button onClick={handleAddFavorite}>Add to Favorites</button>
            </div>
            <div className="movie-display">
                <img src={movie.imageURL} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>
                    <strong>Rating:</strong> {movie.rating.toFixed(1)}
                </p>
                <p>{movie.description}</p>
            </div>
            <h3>Favorites</h3>
            <ul className="favorites">
                {favorites.length === 0 ? (
                    <p>No favorites yet.</p>
                ) : (
                    favorites.map((fav, i) => (
                        <li key={i}>
                            <img src={fav.imageURL} alt={fav.title} />
                            <div>
                                <strong>{fav.title}</strong> (
                                {fav.rating.toFixed(1)})
                                <p>{fav.description.slice(0, 50)}...</p>
                                <button onClick={() => handleRemoveFavorite(i)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;
