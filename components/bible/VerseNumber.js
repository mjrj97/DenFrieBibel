import { useState } from 'react';
import styles from './VerseNumber.module.css';

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
            className={`${styles.verseNumber} ${active ? styles.verseNumberDark : styles.verseNumberLight}`}>v{number}
        </button>
    </span>
}

export default VerseNumber;