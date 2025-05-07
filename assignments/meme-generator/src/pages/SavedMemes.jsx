import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedMemes = ({ memeList, handleEdit, handleDelete }) => {
    const navigate = useNavigate();
    const memeRefs = useRef([]);

    useEffect(() => {
        memeList.forEach((meme, index) => {
            const memeElement = memeRefs.current[index];
            if (memeElement) {
                const img = memeElement.querySelector('img');
                const topText = memeElement.querySelector('.top-text');
                const bottomText = memeElement.querySelector('.bottom-text');

                const imgRect = img?.getBoundingClientRect();
                const topTextRect = topText?.getBoundingClientRect();
                const bottomTextRect = bottomText?.getBoundingClientRect();
            }
        });
    }, [memeList]);

    const onEdit = (meme) => {
        handleEdit(meme);
        navigate('/');
    };

    return (
        <div>
            <h2>Saved Memes</h2>
            {memeList.length === 0 && <p>No memes saved yet!</p>}
            <div className="meme-list">
                {memeList.map((meme, index) => (
                    <div
                        key={meme.id}
                        className="meme-item"
                        ref={(el) => (memeRefs.current[index] = el)}>
                        <div className="meme">
                            <img src={meme.url} alt={meme.name} />
                            <h2 className="top-text">{meme.topText}</h2>
                            <h2 className="bottom-text">{meme.bottomText}</h2>
                        </div>
                        <div className="meme-actions">
                            <button onClick={() => onEdit(meme)}>Edit</button>
                            <button
                                onClick={() => handleDelete(meme.id)}
                                className="delete-button">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedMemes;
