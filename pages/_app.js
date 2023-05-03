import React, { useEffect } from 'react';
import Head from 'next/head'

// Styles
import "bootstrap/dist/css/bootstrap.min.css"
import '@/styles/globals.css'

import Header from '@/components/main/Header';
import Navbar from '@/components/main/Navbar';
import Body from '@/components/main/Body'
import AccountBar from '@/components/main/AccountBar';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Head>
          <link rel="icon" href="/icon.png" />
      </Head>
      <div className='primary p-md-4'>
        <AccountBar/>
        <Header>
          <Navbar/>
        </Header>
        <Body>
          <Component {...pageProps} />
        </Body>
      </div>
    </>
  );
}

export default App;