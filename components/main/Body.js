import React from 'react'

function Body(props) {
    return (
        <div className="py-4">
            <div className='box thirty p-5'>
                {props.children}
            </div>
        </div>
    )
}

export default Body