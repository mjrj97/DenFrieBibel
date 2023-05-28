import React from 'react'
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className={styles.spinner}/>
        </div>
    )
}

export default Loading