import React from 'react'
import styles from './Error.module.css';

function Error(props) {
    return (
        <p className={`${styles.error}`}>
            {props.children}
        </p>
    )
}

export default Error