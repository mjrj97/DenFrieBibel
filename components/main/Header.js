import React from 'react'

function Header(props) {
    return (
        <div className='header p-4'>
            {props.children}
        </div>
    )
}

export default Header