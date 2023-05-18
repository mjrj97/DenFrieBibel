import { useState } from 'react';

function VerseNumber({ number, onClick }) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        onClick(!active);
    };

    return <button 
                id={number}
                onClick={handleClick}
                className={ active ? "verseNumber verseNumber-dark ignore" : "verseNumber verseNumber-light ignore" }>v{number}
            </button>
}

export default VerseNumber;