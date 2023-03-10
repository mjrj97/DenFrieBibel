import React from 'react'

function Error(props) {
    return (
        <div className='error my-4'>
            {props.children}
        </div>
    )
}

export default Error