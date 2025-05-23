import { useState } from 'react';
import Square from './components/Square.jsx';

function App() {
    const [colors, setColors] = useState(['white', 'white', 'white', 'white']);

    // Small Time DJ: Toggle all squares between white and black
    const toggleAllColors = () => {
        const newColor = colors[0] === 'white' ? 'black' : 'white';
        setColors([newColor, newColor, newColor, newColor]);
    };

    // Party DJ: Set top two squares to purple
    const setTopToPurple = () => {
        setColors((prevColors) => [
            'purple',
            'purple',
            prevColors[2],
            prevColors[3]
        ]);
    };

    // Professional DJ: Set bottom left to blue
    const setBottomLeftToBlue = () => {
        setColors((prevColors) => [
            prevColors[0],
            prevColors[1],
            'blue',
            prevColors[3]
        ]);
    };

    // Professional DJ: Set bottom right to blue
    const setBottomRightToBlue = () => {
        setColors((prevColors) => [
            prevColors[0],
            prevColors[1],
            prevColors[2],
            'blue'
        ]);
    };

    // Big Time DJ: Cycle individual square colors
    const cycleColor = (index) => {
        const colorCycle = ['white', 'black', 'purple', 'blue'];
        const currentColor = colors[index];
        const nextColorIndex =
            (colorCycle.indexOf(currentColor) + 1) % colorCycle.length;
        const newColor = colorCycle[nextColorIndex];
        setColors((prevColors) =>
            prevColors.map((c, i) => (i === index ? newColor : c))
        );
    };

    return (
        <div className="app-container">
            <h1 className="app-title">DJ Color Board</h1>
            <div className="grid-container">
                {colors.map((color, index) => (
                    <Square key={index} color={color} />
                ))}
            </div>
            <div className="button-container">
                <button onClick={toggleAllColors} className="btn btn-blue">
                    Toggle All
                </button>
                <button onClick={setTopToPurple} className="btn btn-purple">
                    Top to Purple
                </button>
                <button onClick={setBottomLeftToBlue} className="btn btn-blue">
                    Bottom Left to Blue
                </button>
                <button onClick={setBottomRightToBlue} className="btn btn-blue">
                    Bottom Right to Blue
                </button>
                <button onClick={() => cycleColor(0)} className="btn btn-gray">
                    Cycle Top Left
                </button>
                <button onClick={() => cycleColor(1)} className="btn btn-gray">
                    Cycle Top Right
                </button>
                <button onClick={() => cycleColor(2)} className="btn btn-gray">
                    Cycle Bottom Left
                </button>
                <button onClick={() => cycleColor(3)} className="btn btn-gray">
                    Cycle Bottom Right
                </button>
            </div>
        </div>
    );
}

export default App;
