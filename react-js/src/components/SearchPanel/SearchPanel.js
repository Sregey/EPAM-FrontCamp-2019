import React from 'react';
import TextHeader from '../TextStyling/TextHeader/TextHeader';
import ControlContainer from '../Controls/ControlContainer/ControlContainer';
import Button from '../Controls/Button/Button';
import TextBox from '../Controls/TextBox/TextBox';
import Toggle from '../Controls/Toggle/Toggle';

import indexStyles  from '../../styles/index.module.scss';
import styles  from './SearchPanel.module.scss';

function SearchPanel(props) {
    console.log(indexStyles);
    return (
      <div className={styles.searchPanel}>
        <TextHeader text="find your movie"/>
        <ControlContainer>
          <TextBox className={indexStyles.flex3} />
          <Button className={indexStyles.flex1} text="search" />
        </ControlContainer>
        <ControlContainer>
          <Toggle title="search by" left="title" right="genre" />
        </ControlContainer>
      </div>
    );
  }

export default SearchPanel;