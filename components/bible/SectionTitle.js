import React from 'react'

function SectionTitle(props) {
    return (
        <h5 className='mt-4 mb-2'>
            {props.children}
        </h5>
    )
}

export default SectionTitle