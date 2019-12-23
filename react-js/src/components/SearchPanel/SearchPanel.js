import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import {setSearchText, setSearchBy, findMovies} from '../../redux/actions'

import TextHeader from '../TextStyling/TextHeader/TextHeader';
import ControlContainer from '../Controls/ControlContainer/ControlContainer';
import Button from '../Controls/Button/Button';
import TextBox from '../Controls/TextBox/TextBox';
import Toggle from '../Controls/Toggle/Toggle';

import indexStyles  from '../../styles/index.module.scss';
import styles  from './SearchPanel.module.scss';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSearchByChange = this.onSearchByChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchTextChange(e) {
    this.props.setSearchText(e.target.value);
  }

  onSearchByChange(e) {
    this.props.setSearchBy(e.target.checked ? 'genres' : 'title');
  }

  onSearchClick() {
    const {history, text} = this.props;
    const path = `/search/${text}`;
    if (history.location.pathname === path) {
      this.props.findMovies(text);
    } else {
      history.push(path);
    }
  }

  render() {
    return (
      <div className={styles.searchPanel}>
        <TextHeader text="find your movie"/>
        <ControlContainer>
          <TextBox value={this.props.text} className={indexStyles.flex3} onChange={this.onSearchTextChange} />
          <Button className={indexStyles.flex1} text="search" onClick={this.onSearchClick} />
        </ControlContainer>
        <ControlContainer>
          <Toggle title="search by" left="title" right="genre" onChange={this.onSearchByChange} />
        </ControlContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {text: state.searchText}
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchText: (data) => dispatch(setSearchText(data)),
    setSearchBy: (data) => dispatch(setSearchBy(data)),
    findMovies: (data) => dispatch(findMovies(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPanel));
