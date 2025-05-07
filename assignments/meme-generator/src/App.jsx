import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CreateMeme from './pages/CreateMeme';
import SavedMemes from './pages/SavedMemes';
import './styles.css';

const App = () => {
    const [allMemes, setAllMemes] = useState([]);
    const [currentMeme, setCurrentMeme] = useState({
        url: 'https://i.imgflip.com/1bij.jpg',
        name: 'Default Meme'
    });
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [memeList, setMemeList] = useState([]);
    const [editingMeme, setEditingMeme] = useState(null);

    useEffect(() => {
        console.log(
            'Warning: Direct API calls may be blocked by CORS. If errors occur, use a proxy like https://cors-anywhere.herokuapp.com/ or run via npm run dev.'
        );
        axios
            .get('https://api.imgflip.com/get_memes')
            .then((response) => {
                const memes = response.data.data.memes;
                setAllMemes(memes);
                setCurrentMeme(
                    memes[Math.floor(Math.random() * memes.length)] ||
                        currentMeme
                );
            })
            .catch((error) => {
                console.error('Error fetching memes:', error.message);
                alert(
                    'Failed to load memes. Check console or use a CORS proxy (https://cors-anywhere.herokuapp.com/).'
                );
            });
    }, []);

    const refreshMeme = () => {
        const randomMeme =
            allMemes[Math.floor(Math.random() * allMemes.length)];
        setCurrentMeme(randomMeme || currentMeme);
        setTopText('');
        setBottomText('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMeme) {
            setMemeList(
                memeList.map((meme) =>
                    meme.id === editingMeme.id
                        ? {
                              ...meme,
                              topText,
                              bottomText,
                              url: currentMeme.url,
                              name: currentMeme.name
                          }
                        : meme
                )
            );
            setEditingMeme(null);
        } else {
            const newMeme = {
                id: uuidv4(),
                url: currentMeme.url,
                name: currentMeme.name,
                topText,
                bottomText
            };
            setMemeList([newMeme, ...memeList]);
        }
        setTopText('');
        setBottomText('');
    };

    const handleEdit = (meme) => {
        setEditingMeme(meme);
        setTopText(meme.topText);
        setBottomText(meme.bottomText);
        setCurrentMeme({ url: meme.url, name: meme.name });
    };

    const handleDelete = (id) => {
        setMemeList(memeList.filter((meme) => meme.id !== id));
    };

    return (
        <div className="container">
            <h1>Meme Generator</h1>
            <nav className="nav-bar">
                <Link to="/">Create Meme</Link>
                <Link to="/saved">Saved Memes</Link>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <CreateMeme
                            currentMeme={currentMeme}
                            topText={topText}
                            bottomText={bottomText}
                            setTopText={setTopText}
                            setBottomText={setBottomText}
                            handleSubmit={handleSubmit}
                            refreshMeme={refreshMeme}
                            editingMeme={editingMeme}
                        />
                    }
                />
                <Route
                    path="/saved"
                    element={
                        <SavedMemes
                            memeList={memeList}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
