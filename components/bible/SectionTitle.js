import React from 'react'

function SectionTitle(props) {
    return (
        <h4 className='mt-4 mb-2'>
            {props.children}
        </h4>
    )
}

export default SectionTitle