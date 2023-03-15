// Styles
import "bootstrap/dist/css/bootstrap.min.css"
import '@/styles/globals.css'

import Header from '@/components/main/Header';
import Navbar from '@/components/main/Navbar';
import Body from '@/components/main/Body'
import Footer from '@/components/main/Footer';

const App = ({ Component, pageProps }) => {
  return (
    <div className='primary p-md-4'>
      <Header>
        <Navbar/>
      </Header>
      <Body>
        <Component {...pageProps} />
      </Body>
      {/*<Footer>
        <p>Den frie bibel</p>
      </Footer>*/}
    </div>
  );
}

export default App;