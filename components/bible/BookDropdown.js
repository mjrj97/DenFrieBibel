import React, { useEffect, useState, useId } from 'react';
import Select from 'react-select';
import styles from './BookDropdown.module.css';

function BookDropdown({book, chapter, books, changed}) {
    const [currentBooks, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [currentBook, setCurrentBook] = useState(book);
    const [currentChapter, setCurrentChapter] = useState(chapter);

    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();

    useEffect(()=>{
        let buffer = [];

        for (let i = 0; i < books.length; i++) {
            let isDisabled = true;
            for (let j = 0; j < books[i].chapters.length && isDisabled; j++) {
                if (books[i].chapters[j] != 0)
                    isDisabled = false;
            }

            buffer.push({ 
                value: books[i].abbreviation, 
                label: books[i].name,
                chapters: books[i].chapters,
                isDisabled
            });
        }
        setBooks(buffer);

        if (books && books.length > 0)
        {
            setCurrentBook({ 
                value: books[0].abbreviation, 
                label: books[0].name ,
                chapters: books[0].chapters
            });
        }
    }, [books]);

    useEffect(() => {
        let buffer = [];
        for (let i = 1; currentBook.chapters &&  i <= currentBook.chapters.length; i++) {
            const translation = currentBook.chapters[i-1];

            let color;
            if (translation == 0) {
                color = '#dddddd';
            }
            else if (translation < 50) {
                color = '#6c757d';
            }
            else if (translation < 75) {
                color = '#ffc107';
            }
            else if (translation < 100) {
                color = '#17a2b8';
            }
            else if (translation == 100) {
                color = '#28a745';
            }

            let isDisabled = translation == 0;

            buffer.push({
                value: i,
                label: "Kapitel " + i,
                isDisabled, color
            });
        }
        setChapters(buffer);

        let first;
        if (currentBook.chapters) {
            for (let i = 0; i < currentBook.chapters.length && !first; i++) {
                if (currentBook.chapters[i] != 0) {
                    first = {
                        value: (i+1),
                        label: "Kapitel " + (i+1)
                    }
                }
            }

            setCurrentChapter(first);
        }
    }, [currentBook]);

    // ON LOAD, CURRENTCHAPTER IS SOMETIMES SET TO 1
    useEffect(() => {
        changed(currentBook, currentChapter);

        let nextChapter;
        if (currentBook.chapters) {
            for (let i = currentChapter.value; i < currentBook.chapters.length && !nextChapter; i++) {
                if (currentBook.chapters[i] != 0) {
                    nextChapter = {
                        value: (i+1),
                        label: "Kapitel " + (i+1)
                    }
                }
            }
        }

        let previousChapter;
        if (currentBook.chapters) {
            for (let i = currentChapter.value - 2; i >= 0 && !previousChapter; i--) {
                if (currentBook.chapters[i] != 0) {
                    previousChapter = {
                        value: (i+1),
                        label: "Kapitel " + (i+1)
                    }
                }
            }
        }

        setNext(nextChapter);
        setPrevious(previousChapter);
    }, [currentChapter]);

    const desktopStyles = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50,
            fontSize: 20,
            fontWeight: 900
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? "#0d6efd"
              : isFocused
              ? "#eeeeee"
              : "white",
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? "#dddddd"
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                ? "#dddddd"
                : undefined,
            },
          };
        }
    };
    
    const phoneStyles = {
        ...desktopStyles,
        control: base => ({
            ...base,
            height: 40,
            minHeight: 40,
            fontSize: 16,
            fontWeight: 900
        })
    }

    return (
        <>
            <div className={`sticky-top ${styles.stickyDropdown} ignore d-print-none`}>
                <div className="px-0 mx-0">
                    <div className={styles.arrowContainer}>
                        <div className='d-none d-md-block w-100'>
                            {previous ? <button className={`btn btn-light ${styles.arrow} ${styles.arrowLeft}`} onClick={() => {setCurrentChapter(previous)}} type="button">←</button> : <></> }
                            {next ? <button className={`btn btn-light ${styles.arrow} ${styles.arrowRight}`} onClick={() => {setCurrentChapter(next)}} type="button">→</button> : <></> }
                        </div>
                        <div className='d-block d-md-none'>
                            {previous ? <button className={`btn btn-light ${styles.arrow} ${styles.arrowLowerLeft}`} onClick={() => {setCurrentChapter(previous)}} type="button">←</button> : <></> }
                            {next ? <button className={`btn btn-light ${styles.arrow} ${styles.arrowLowerRight}`} onClick={() => {setCurrentChapter(next)}} type="button">→</button> : <></> }
                        </div>
                    </div>
                    <div className={`row ${styles.selectContainer}`}>
                        <div className='d-none d-md-block'>
                            <div className='row'>
                                <div className='col-8'>
                                    <Select instanceId={useId()} className='soft-shadow' value={currentBook} options={currentBooks} onChange={(e) => setCurrentBook(e)} styles={desktopStyles}/>
                                </div>
                                <div className='col-4'>
                                    <Select instanceId={useId()} className='soft-shadow' value={currentChapter} options={chapters} onChange={(e) => setCurrentChapter(e)} styles={desktopStyles}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-block d-md-none'>
                            <div className='row'>
                                <div className='col-7'>
                                    <Select instanceId={useId()} className='soft-shadow' value={currentBook} options={currentBooks} isSearchable={false} onChange={(e) => setCurrentBook(e)} styles={phoneStyles}/>
                                </div>
                                <div className='col-5'>
                                    <Select instanceId={useId()} className='soft-shadow' value={currentChapter} options={chapters} isSearchable={false} onChange={(e) => setCurrentChapter(e)} styles={phoneStyles}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.transparentTransition}/>
                </div>
            </div>
            {currentBook ? <h1 className='d-none d-print-block'>{currentBook.label}, {currentChapter.label.toLowerCase()}</h1> : <></>}
        </>
    )
}

export default BookDropdown;