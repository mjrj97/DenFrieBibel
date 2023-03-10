// Libraries
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// Internal components
import BibleText from '@/components/BibleText'
import BookDropdown from '@/components/BookDropdown'

const Index = () => {
  const [currentBook, setCurrentBook] = useState("ruth");
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
        setBooks(data.books);
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Den frie bibel</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <BookDropdown bookChanged={setCurrentBook} chapterChanged={setCurrentChapter} books={books}/>
      <BibleText text={text}/>
    </>
  )
}

export default Index;