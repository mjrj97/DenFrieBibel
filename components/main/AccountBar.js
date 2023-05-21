import Link from 'next/link'
import { useEffect, useState } from 'react';

const AccountBar = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        fetch("/api/auth/authenticate").then(
            response => response.json()
        ).then(
            data => {setUser(data.content)}
        );
    });

    const logout = () => {
        fetch("/api/auth/logout").then(
            () => {
                setUser()
            }
        )
    }

    return (
        <div className='account-container d-none d-md-block'>
            {user ? 
            (<>
                <button className='account-button' onClick={logout}>Log ud</button>
                <Link className='account-button' href="/account">{user.name}</Link>
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