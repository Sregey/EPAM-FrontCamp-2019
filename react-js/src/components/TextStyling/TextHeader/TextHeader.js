import React from 'react';
import styles  from './TextHeader.module.scss';

function TextHeader(props) {
    return (
        <div className={styles.textHeader}>{props.text}</div>
    );
  }

export default TextHeader;