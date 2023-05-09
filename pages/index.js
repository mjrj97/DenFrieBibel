// Libraries
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// Internal components
import BibleText from '@/components/bible/BibleText'
import BookDropdown from '@/components/bible/BookDropdown'
import CommentContainer from '@/components/bible/CommentContainer'

const Index = () => {
  const [currentBook, setCurrentBook] = useState("Ruth");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("");
  
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
    fetch("/api/bible?book=" + currentBook + "&chapter=" + currentChapter).then(
      response => response.json()
    ).then(
      data => {setText(data.content);}
    );
  }, [currentBook, currentChapter]);
  
  useEffect(() => {
    fetch("/api/bible?book=all").then(
      response => response.json()
    ).then(
      data => {
        setBooks(data.content);
      }
    );
  }, []);
  
  const onSelectedVerse = (number, state) => {
    if (state == true) {
        let array = [...selected];
        array.push(number);
        setSelected(array);
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
      <CommentContainer selected={selected} chapter={currentChapter}/>
      <BookDropdown bookChanged={setCurrentBook} chapterChanged={setCurrentChapter} books={books}/>
      <div className='my-4'/>
      <BibleText text={text} onSelectionChange={onSelectedVerse}/>
    </>
  )
}

export default Index;