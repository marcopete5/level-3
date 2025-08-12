import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [colorTrigger, setColorTrigger] = useState(0);
    const [loading, setLoading] = useState(true);

    // We don't need a separate state for color, we can apply it directly.

    // Effect for fetching Pokemon data (runs once)
    useEffect(() => {
        fetch('https://api.vschool.io/pokemon')
            .then((response) => response.json())
            .then((data) => {
                setPokemonList(data.objects[0].pokemon);
            })
            .catch((error) => console.error('Error fetching Pokemon:', error));
    }, []);

    // Effect for fetching and applying background color
    useEffect(() => {
        fetch('https://random-color.onrender.com/colors/random')
            .then((response) => response.json())
            .then((data) => {
                // Apply the color directly to the page's body
                document.body.style.backgroundColor = data.hex;
                setLoading(false); // Set loading to false after color is applied
            })
            .catch((error) => console.error('Error fetching color:', error));
    }, [colorTrigger]); // Runs on mount and whenever colorTrigger changes

    // Function to trigger a color change
    function changeColor() {
        setColorTrigger((prevTrigger) => prevTrigger + 1);
    }

    const pokemonElements = pokemonList.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
    ));

    return (
        <div className="app-container">
            <h1>Pokemon List</h1>
            <button onClick={changeColor}>Change Background Color</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="pokemon-list">{pokemonElements}</div>
            )}
        </div>
    );
}

export default App;
