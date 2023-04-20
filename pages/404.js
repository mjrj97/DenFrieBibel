import Head from 'next/head'

const FourOhFour = () => {
  return <>
    <Head>
      <title>404 - Denne side findes ikke...</title>
    </Head>
    <h1 className='text-center'>404</h1>
    <p className='text-center'>Denne side findes ikke...</p>
  </>
}

export default FourOhFour;