import React from 'react';

import indexStyles from '../../../styles/index.module.scss';
import styles  from './TextBox.module.scss';

function TextBox(props) {
    return (
        <input type="text"
            className={`${indexStyles.control} ${styles.textBox} ${props.className}`} />
    );
}

export default TextBox;