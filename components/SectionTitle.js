import React from 'react'

function SectionTitle(props) {
    return (
        <h4 className='mt-2 mb-2'>
            <br className='ignore'/>
            {props.children}
        </h4>
    )
}

export default SectionTitle