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
        <div className='p-md-4 d-none d-md-block'>
          <AccountBar/>
          <div className='col-xl-5 col-lg-8 col-md-8 col-xs-10 mx-auto'>
            <Header>
              <Navbar/>
            </Header>
            <Body>
              <Component {...pageProps} />
            </Body>
          </div>
        </div>
        <div className='d-block d-md-none'>
          <Navbar/>
          <div className='p-4'>
            <Component {...pageProps} />
          </div>
        </div>
    </>
  );
}

export default App;