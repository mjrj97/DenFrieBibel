import React from 'react'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <div className='navigtaion-title'>
                Den frie bibel
            </div>
            <div className='row p-2 pt-4'>
                <Link className="col-3 navigation-button" href="/">Læs i bibelen</Link>
                <Link className="col-3 navigation-button" href="/settings">Læseoplevelse</Link>
                <Link className="col-3 navigation-button" href="/about">Om os</Link>
                <Link className="col-3 navigation-button" href="/contact">Kontakt os</Link>
            </div>
            <hr className='mb-0 mt-3'/>
        </div>
    )
}

export default Navbar;