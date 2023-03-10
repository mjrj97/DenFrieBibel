import React from 'react'

function Body(props) {
    return (
        <div className="col-md-5 col-xs-10 mx-auto py-4">
            <div className='box p-5'>
                {props.children}
            </div>
        </div>
    )
}

export default Body