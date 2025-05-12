import { useState } from 'react';

function LightSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`switch-container ${isDarkMode ? 'dark' : 'light'}`}>
            <h2>Mode: {isDarkMode ? 'Dark' : 'Light'}</h2>
            <button onClick={toggleMode}>
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            <p>
                This app uses{' '}
                <code class="language-javascript">
                    <span class="token-keyword">useState</span>
                </code>{' '}
                to toggle between light and dark modes.
            </p>
        </div>
    );
}

export default LightSwitch;
