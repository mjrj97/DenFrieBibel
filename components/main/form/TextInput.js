import React from 'react'

const TextInput = (props) => {
  return (
    <>
        <div className="form-group mb-2">
            <input type={props.type}
                value={props.value}
                onChange={(e) => props.onChange(e)} 
                className="form-control" id={props.id} placeholder={props.placeholder}/>
            {props.error ? <span className='text-danger'>{props.error}</span> : <></>}
        </div>
    </>
  )
}

export default TextInput