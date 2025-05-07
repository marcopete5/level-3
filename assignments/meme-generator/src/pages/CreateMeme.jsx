import React, { useEffect, useRef } from 'react';

const CreateMeme = ({
    currentMeme,
    topText,
    bottomText,
    setTopText,
    setBottomText,
    handleSubmit,
    refreshMeme,
    editingMeme
}) => {
    const previewRef = useRef(null);

    useEffect(() => {
        const previewElement = previewRef.current;
        if (previewElement) {
            const img = previewElement.querySelector('img');
            const topTextEl = previewElement.querySelector('.top-text');
            const bottomTextEl = previewElement.querySelector('.bottom-text');

            const imgRect = img?.getBoundingClientRect();
            const topTextRect = topTextEl?.getBoundingClientRect();
            const bottomTextRect = bottomTextEl?.getBoundingClientRect();
        }
    }, [currentMeme, topText, bottomText]);

    return (
        <div className="create-meme-container">
            <div className="meme-form">
                <h2>{editingMeme ? 'Edit Meme' : 'Create Meme'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Top Text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                    />
                    <button type="submit">
                        {editingMeme ? 'Save Meme' : 'Create Meme'}
                    </button>
                </form>
                <button onClick={refreshMeme} className="refresh-button">
                    Refresh Meme Image
                </button>
            </div>
            <div className="meme-preview">
                <h3>Preview</h3>
                <div className="meme" ref={previewRef}>
                    <img src={currentMeme.url} alt={currentMeme.name} />
                    <h2 className="top-text">{topText}</h2>
                    <h2 className="bottom-text">{bottomText}</h2>
                </div>
            </div>
        </div>
    );
};

export default CreateMeme;
