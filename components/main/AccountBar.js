import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from './AccountBar.module.css';

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
        <div className='d-none d-md-block'>
            <div className={`${styles.accountContainer}`}>
                {user ? 
                (<>
                    <button type="button" className={styles.accountButton} onClick={logout}>Log ud</button>
                    <Link className={styles.accountButton} href="/account">{user.name}</Link>
                    <img src='/user.png' className={styles.accountImage} alt='profile picture'/>
                </>) : 
                (<>
                    <Link className={styles.accountButton} href="/login">Log ind</Link>
                    <Link className={styles.accountButton} href="/register">Opret bruger</Link>
                </>)}
            </div>
        </div>
    )
}

export default AccountBar