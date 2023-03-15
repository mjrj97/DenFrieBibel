import React from 'react'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <a className="navbar-brand" href="#test"><h2>Den frie bibel</h2></a>
            <div className='row p-2 pt-4'>
                <Link className="col-3 nav-link" href="/">Læs i bibelen</Link>
                <Link className="col-3 nav-link" href="/settings">Læseoplevelse</Link>
                <Link className="col-3 nav-link" href="/about">Om os</Link>
                <Link className="col-3 nav-link" href="/contact">Kontakt os</Link>
            </div>
        </div>
    )
}

export default Navbar;