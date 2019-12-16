import React from 'react';
import indexStyles  from '../../styles/index.module.scss';
import styles  from './ResultPanel.module.scss';
import Toggle from '../Controls/Toggle/Toggle';

function ResultPanel(props) {
    return (
        <div className={`${styles.resultPanel} ${indexStyles.twoSideItems}`}>
            <div>{props.text}</div>
            <Toggle title="sort by" left="release date" right="rating" />
        </div>
    );
  }

export default ResultPanel;