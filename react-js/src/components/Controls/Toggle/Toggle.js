import React from 'react';
import styles  from './Toggle.module.scss';

function Toggle(props) {
    return (
        <label className={styles.toggle}>
            <input type="checkbox" onChange={props.onChange} />
            <div className={styles.title}>{props.title}</div>
            <div className={styles.left}>{props.left}</div>
            <div className={styles.right}>{props.right}</div>
        </label>
    );
  }

export default Toggle;