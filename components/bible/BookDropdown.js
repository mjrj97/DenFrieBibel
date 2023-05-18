import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function BookDropdown({books, bookChanged, chapterChanged}) {
    const [currentBooks, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [currentBook, setCurrentBook] = useState({ 
        value: "1Mos", 
        label: "Første Mosebog" 
    });
    const [currentChapter, setCurrentChapter] = useState({ 
        value: 3, 
        label: "Kapitel 3" 
    });

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

    useEffect(()=>{
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
        for (let i = 0; currentBook.chapters && i < currentBook.chapters.length && !first; i++) {
            if (currentBook.chapters[i] != 0) {
                first = {
                    value: (i+1),
                    label: "Kapitel " + (i+1)
                }
            }
        }
        if (!first) {
            first = { 
                value: 1, 
                label: "Kapitel 1" 
            }
        }
        onChapterChange(first);

    }, [currentBook]);

    function onBookChange(book) {
        setCurrentBook(book);
        bookChanged(book.value);
    }

    function onChapterChange(chapter) {
        chapterChanged(chapter.value);
        setCurrentChapter(chapter);
    }

    function addChapter() {
        if (currentChapter.value < currentBook.chapters.length)
            onChapterChange(chapters[currentChapter.value]);
    }

    function subtractChapter() {
        if (currentChapter.value > 1)
            onChapterChange(chapters[currentChapter.value - 2]);
    }

    const colourStyles = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50,
            fontSize: 20,
            fontFamily: "Verdana"
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

    const style = {
        control: base => ({
            ...base,
            height: 50,
            minHeight: 50,
            fontSize: 20,
            fontFamily: "Verdana"
        })
    };

    return (
        // Sticky top: https://stackoverflow.com/questions/28340054/bootstrap-keep-div-fixed-after-scrolling-to-it
        <div className="sticky-top sticky-dropdown">
            <div className="px-0 mx-0 mb-2">
                <div className='arrow-container d-none d-sm-block'>
                    <div className='d-flex justify-content-between'>
                        <button className={'btn btn-light arrow arrow-left ignore' + (currentChapter.value == 1 ? ' disabled' : '')} onClick={subtractChapter} type="button">←</button>
                        <button className={'btn btn-light arrow arrow-right ignore' + (currentBook.chapters && currentChapter.value == currentBook.chapters.length ? ' disabled' : '')} onClick={addChapter} type="button">→</button>
                    </div>
                </div>
                <div className="row select-container">
                    <div className='col-8'>
                        <Select value={currentBook} options={currentBooks} onChange={(e) => onBookChange(e)} styles={colourStyles}/>
                    </div>
                    <div className='col-4'>
                        <Select value={currentChapter} options={chapters} onChange={(e) => onChapterChange(e)} styles={colourStyles}/>
                    </div>
                </div>
                <div className='transparent-transition'/>
            </div>
        </div>
    )
}

export default BookDropdown;