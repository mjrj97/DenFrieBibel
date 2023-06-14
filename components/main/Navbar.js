import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Collapse from '@/components/main/Collapse';

const Navbar = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className='d-block d-md-none'>
                <nav className="navbar navbar-expand-md navbar-light bg-light px-4 py-3 d-print-none">
                    <div className='w-100'>
                        <div className='d-flex justify-content-between'>
                            <Image alt="icon" title="icon" src="/phone-icon.png" width={40} height={40} priority={true}/>
                            <h1 style={ { margin: 0, lineHeight: "3rem" } }>Den Frie Bibel</h1>
                            <button className="navbar-toggler mt-1 mb-1" style={ { backgroundColor: "white", borderColor: "gray" } } type="button" onClick={() => {setShow(!show)}}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <Collapse isOpen={show} baseHeight={165}>
                            <hr/>
                            <div className="navbar-nav">
                                <Link className={`${styles.navigationButton} my-2`} onClick={() => {setShow(false)}} href="/">Bibeltekst</Link>
                                <Link className={`${styles.navigationButton} my-2`} onClick={() => {setShow(false)}} href="/settings">Læseoplevelse</Link>
                                <Link className={`${styles.navigationButton} my-2`} onClick={() => {setShow(false)}} href="/about">Om os</Link>
                                <Link className={`${styles.navigationButton} my-2`} onClick={() => {setShow(false)}} href="/contact">Kontakt os</Link>
                            </div>
                        </Collapse>
                    </div>
                </nav>
            </div>
            <div className='d-none d-md-block'>
                <Link className={styles.navigtaionTitle} href="/">Den frie bibel</Link>
                <div className='row p-2 pt-4'>
                    <Link className={`col-3 ${styles.navigationButton}`} href="/">Bibeltekst</Link>
                    <Link className={`col-3 ${styles.navigationButton}`} href="/settings">Læseoplevelse</Link>
                    <Link className={`col-3 ${styles.navigationButton}`} href="/about">Om os</Link>
                    <Link className={`col-3 ${styles.navigationButton}`} href="/contact">Kontakt os</Link>
                </div>
                <hr className='mb-0 mt-3'/>
            </div>
        </>
    )
}

export default Navbar;