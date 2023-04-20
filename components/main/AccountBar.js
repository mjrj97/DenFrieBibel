import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const AccountBar = () => {
    const {data: session} = useSession();

    return (
        <div className='account-container'>
            {session?.user ? 
            (<>
                <button className='account-button' onClick={() => signOut({callbackUrl: "/"})}>Log ud</button>
                <Link className='account-button' href="/user">{session.user.name}</Link>
                <img src='/user.png' className='account-image'/>
            </>) : 
            (<>
                <Link className='account-button' href="/login">Log ind</Link>
                <Link className='account-button' href="/register">Opret bruger</Link>
            </>)}
        </div>
    )
}

export default AccountBar