// Libraries
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// Internal components
import BibleText from '@/components/BibleText'
import BookDropdown from '@/components/BookDropdown'
import CommentContainer from '@/components/CommentContainer'

const Index = () => {
  const [currentBook, setCurrentBook] = useState("Ruth");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/bible?book=" + currentBook + "&chapter=" + currentChapter).then(
      response => response.json()
    ).then(
      data => {setText(data)}
    );
  }, [currentBook, currentChapter]);
  
  useEffect(() => {
    fetch("/api/bible?book=all").then(
      response => response.json()
    ).then(
      data => {
        setBooks(data);
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Den Frie Bibel</title>
      </Head>
      <CommentContainer/>
      <BookDropdown bookChanged={setCurrentBook} chapterChanged={setCurrentChapter} books={books}/>
      <div className='my-4'/>
      <BibleText text={text}/>
    </>
  )
}

export default Index;