import React from 'react'

function Header(props) {
    return (
        <div className='text-center p-4 d-print-none'>
            {props.children}
        </div>
    )
}

export default Header