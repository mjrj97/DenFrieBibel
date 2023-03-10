import React from 'react'

function Footer(props) {
    return (
        <div className='col-md-5 col-xs-10 mx-auto'>
            <div className='box p-5'>
                {props.children}
            </div>
        </div>
    )
}

export default Footer