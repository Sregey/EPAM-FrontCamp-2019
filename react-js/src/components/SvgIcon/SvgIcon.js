import React from 'react';
import styles  from './SvgIcon.module.scss';

function SvgIcon(props) {
    return (
        <div className={styles.svgIcon}>
            {props.children}
        </div>
    );
  }

export default SvgIcon;