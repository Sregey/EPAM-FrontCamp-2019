import React from 'react';
import styles  from './PageFooter.module.scss';
import Logo from '../../Logo/Logo';

function PageFooter() {
    return (
        <div className={styles.pageFooter}>
            <Logo />
        </div>
    );
  }

export default PageFooter;