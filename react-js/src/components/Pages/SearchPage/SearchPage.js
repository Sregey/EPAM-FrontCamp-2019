import React from 'react';
import {connect} from 'react-redux';

import {findMovies} from '../../../redux/actions'

import MasterPage from '../MasterPage/MasterPage';
import MovieList from '../../MovieList/MovieList';
import SearchPanel from '../../SearchPanel/SearchPanel';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {needUpdate: false};
  }

  static getDerivedStateFromProps(props, state) {
    const text = props.match.params.text;
    if (text !== state.prevText) {
      return {
        prevText: text,
        needUpdate: true,
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.findMovies(this.props.match.params.text);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.needUpdate) {
      this.props.findMovies(this.props.match.params.text);
      this.setState({needUpdate: false});
    }
  }

  render() {
    return (
      <MasterPage 
        headerContent={<SearchPanel />}
        pageContent={<MovieList />}
        hideSearchIcon={true}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findMovies: (data) => dispatch(findMovies(data)),
  };
}

export default connect(null, mapDispatchToProps)(SearchPage);
