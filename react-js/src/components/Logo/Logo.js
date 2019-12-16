import React from 'react';
import indexStyles  from '../../styles/index.module.scss';
import styles  from './Logo.module.scss';

function Logo(props) {
    return (
        <span className={styles.logo}>
            <span className={indexStyles.bold}>netflix</span>
            <span>roulette</span>
        </span>
    );
  }

export default Logo;