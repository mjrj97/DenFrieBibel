import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div>
            <Link className={styles.navigtaionTitle} href="/">Den frie bibel</Link>
            <div className='row p-2 pt-4'>
                <Link className={`col-3 ${styles.navigationButton}`} href="/">Bibeltekst</Link>
                <Link className={`col-3 ${styles.navigationButton}`} href="/settings">Læseoplevelse</Link>
                <Link className={`col-3 ${styles.navigationButton}`} href="/about">Om os</Link>
                <Link className={`col-3 ${styles.navigationButton}`} href="/contact">Kontakt os</Link>
            </div>
            <hr className='mb-0 mt-3'/>
        </div>
    )
}

export default Navbar;