import { useState } from 'react';

function VerseNumber({ number, onClick }) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        onClick(!active);
    };

    return <span className='ignore'>
        <button 
            id={number}
            onClick={handleClick}
            className={ active ? "verseNumber verseNumber-dark" : "verseNumber verseNumber-light" }>v{number}
        </button>
    </span>
}

export default VerseNumber;