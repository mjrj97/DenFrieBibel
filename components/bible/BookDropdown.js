import React, { useEffect, useState, useId } from 'react';
import Select from 'react-select';

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

    const colourStyles = {
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

    return (
        <div className="sticky-top sticky-dropdown">
            <div className="px-0 mx-0 mb-2">
                <div className='arrow-container'>
                    <div className='d-flex justify-content-between'>
                        <button className={'btn btn-light arrow arrow-left ignore d-none d-md-block' + (previous ? '' : ' disabled')} onClick={() => {setCurrentChapter(previous)}} type="button">←</button>
                        <button className={'btn btn-light arrow arrow-right ignore d-none d-md-block' + (next ? '' : ' disabled')} onClick={() => {setCurrentChapter(next)}} type="button">→</button>
                    </div>
                    <button className={'btn btn-light arrow arrow-lowerLeft ignore d-block d-md-none' + (previous ? '' : ' disabled')} onClick={() => {setCurrentChapter(previous)}} type="button">←</button>
                    <button className={'btn btn-light arrow arrow-lowerRight ignore d-block d-md-none' + (next ? '' : ' disabled')} onClick={() => {setCurrentChapter(next)}} type="button">→</button>
                </div>
                <div className="row select-container">
                    <div className='col-8'>
                        <Select instanceId={useId()} className='test' value={currentBook} options={currentBooks} onChange={(e) => setCurrentBook(e)} styles={colourStyles}/>
                    </div>
                    <div className='col-4'>
                        <Select instanceId={useId()} className='test' value={currentChapter} options={chapters} onChange={(e) => setCurrentChapter(e)} styles={colourStyles}/>
                    </div>
                </div>
                <div className='transparent-transition'/>
            </div>
        </div>
    )
}

export default BookDropdown;