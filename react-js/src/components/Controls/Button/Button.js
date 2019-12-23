import React from 'react';

import indexStyles from '../../../styles/index.module.scss';
import styles  from './Button.module.scss';

function Button(props) {
    return (
        <input type="button" 
            className={`${indexStyles.control} ${styles.button} ${props.className}`}
            value={props.text}
            onClick={props.onClick} />
    );
}

export default Button;