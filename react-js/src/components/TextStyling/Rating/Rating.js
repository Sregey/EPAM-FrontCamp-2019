import React from 'react';
import styles  from './Rating.module.scss';

function Rating(props) {
    return (
        <div className={styles.rating}>{props.value}</div>
    );
  }

export default Rating;