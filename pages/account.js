// Libraries
import Head from 'next/head'
import Image from 'next/image';

const Account = () => {
  return (
    <>
      <Head>
        <title>Bruger</title>
      </Head>
      <div>
        <div className='mb-5'>
          <Image src='/user.png' className='accountImage' alt="Account image" width={100} height={100}/>
          <div className='accountpage-container mx-4'>
            <h2 className='accountpage-name'>Martin J. R. Jensen</h2><br/>
            <span><strong>E-mail:</strong> martin.jensen.1997@hotmail.com</span><br/>
            <span><strong>Oprettet:</strong> 27-04-2023</span>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary">Bekræft bruger</button>
          <button type="button" className="btn btn-danger mx-2">Ændr e-mail</button>
          <button type="button" className="btn btn-danger">Ændr adgangskode</button>
          <button type="button" className="btn btn-danger mx-2">Slet bruger</button>
        </div>
      </div>
    </>
  )
}

export default Account;