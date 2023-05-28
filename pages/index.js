// Libraries
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// Internal components
import BibleText from '@/components/bible/BibleText';
import BookDropdown from '@/components/bible/BookDropdown';
import CommentContainer from '@/components/bible/CommentContainer';

const Index = () => {
  const [currentBook, setCurrentBook] = useState({ 
    value: "1Mos", 
    label: "Første Mosebog" 
  });
  const [currentChapter, setCurrentChapter] = useState({ 
    value: 3, 
    label: "Kapitel 3" 
  });
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("");
  
  const [selected, setSelected] = useState([]);
  
  useEffect(() => {
    fetch("/api/bible?book=all").then(
      response => response.json()
    ).then(
      data => {
        setBooks(data.content);
      }
    );
  }, []);

  useEffect(() => {
    setSelected([]);
    setText("");
    fetch("/api/bible?book=" + currentBook.value + "&chapter=" + currentChapter.value).then(
      response => response.json()
    ).then(
      data => {setText(data);}
    );
  }, [currentChapter]);
  
  const setBookAndChapter = (book, chapter) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
  }

  const onSelectedVerse = (number, state) => {
    if (state == true) {
        let array = [...selected];
        array.push(number);
        setSelected(array);
        console.log(array);
    }
    else 
    {
        let array = [...selected];
        array = array.filter(item => item !== number);
        setSelected(array);
    }
  }

  return (
    <>
      <Head>
        <title>Den Frie Bibel</title>
      </Head>
      {selected && selected.length > 0 ? <CommentContainer selected={selected} chapter={currentChapter.value}/> : <></>}
      <BookDropdown book={currentBook} chapter={currentChapter} books={books} changed={setBookAndChapter}/>
      <BibleText text={text} onSelectionChange={onSelectedVerse}/>
    </>
  )
}

export default Index;