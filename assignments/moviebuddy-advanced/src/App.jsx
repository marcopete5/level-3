import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
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
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    );

    const [movieIndex, setMovieIndex] = useState(0);
    const [favorites, setFavorites] = useState(() => {
        const savedFavs = localStorage.getItem('favMovies');
        return savedFavs ? JSON.parse(savedFavs) : [];
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState(0);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        // Apply theme class to body for global styling reach if needed,
        // though '.main' should be sufficient with proper CSS.
        // document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('favMovies', JSON.stringify(favorites));
    }, [favorites]);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    const filteredMovies = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredFavMovies = filteredMovies.filter(
        (movie) => parseFloat(movie.rating) >= ratingFilter
    );

    const handleNavigation = (direction) => {
        setMovieIndex((prev) => nextMovie(prev, direction, movies.length));
    };

    const handleAddFavorite = () => {
        const movie = movies[movieIndex];
        if (!favorites.some((fav) => fav.title === movie.title)) {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    const handleRemoveFavorite = (title) => {
        // Changed to identify by title or a unique ID
        setFavorites((prev) => prev.filter((movie) => movie.title !== title));
    };

    const currentMovie = movies[movieIndex];

    return (
        <div className={`${theme} main`}>
            {' '}
            {/* Theme class is applied here */}
            <div className="app">
                <h1>MovieBuddy</h1>
                <div className="controls">
                    <button onClick={() => handleNavigation('random')}>
                        Random Movie
                    </button>
                    <button onClick={() => handleNavigation('previous')}>
                        Previous
                    </button>
                    <button onClick={() => handleNavigation('next')}>
                        Next
                    </button>
                    <button onClick={handleAddFavorite}>
                        Add to Favorites
                    </button>
                    {/* MODIFIED BUTTON BELOW */}
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle-button">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>

                <SearchBar
                    setSearchQuery={setSearchQuery}
                    setRatingFilter={setRatingFilter}
                />
                {currentMovie && (
                    <div className="movie-display">
                        <img
                            src={currentMovie.imageURL}
                            alt={currentMovie.title}
                        />
                        <h2>{currentMovie.title}</h2>
                        <p>
                            <strong>Rating:</strong>{' '}
                            {currentMovie.rating.toFixed(1)}
                        </p>
                        <p>{currentMovie.description}</p>
                    </div>
                )}
                <h3>Favorites</h3>
                <ul className="favorites">
                    {filteredFavMovies.length === 0 ? (
                        <p>No favorites yet. Add some!</p>
                    ) : (
                        filteredFavMovies.map(
                            (
                                favMovie // Changed variable name for clarity
                            ) => (
                                <li key={favMovie.title}>
                                    {' '}
                                    {/* Use a unique key like movie.id if available */}
                                    <img
                                        src={favMovie.imageURL}
                                        alt={favMovie.title}
                                    />
                                    <div className="favorite-movie-details">
                                        <strong>{favMovie.title}</strong> (
                                        {favMovie.rating.toFixed(1)})
                                        <p>
                                            {favMovie.description.slice(0, 50)}
                                            ...
                                        </p>
                                        {/* MODIFIED BUTTON BELOW */}
                                        <button
                                            className="remove-button"
                                            onClick={() =>
                                                handleRemoveFavorite(
                                                    favMovie.title
                                                )
                                            }>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            )
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;
