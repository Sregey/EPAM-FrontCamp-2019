import React from 'react';
import styles  from './Measure.module.scss';

function Measure(props) {
    return (
        <div className={styles.measure}>
            <span className={styles.value}>
                {props.value}
                <span className={styles.unit}>{props.unit}</span>
            </span>
        </div>
    );
  }

export default Measure;