import React from 'react';
import {connect} from 'react-redux';

import {getMovie, findMovies, findMoviesForCurrentMovie} from '../../../redux/actions'

import MasterPage from '../MasterPage/MasterPage';
import MovieList from '../../MovieList/MovieList';
import MovieDetails from '../../MovieDetails/MovieDetails';

class MovieDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {needUpdate: false};
  }

  static getDerivedStateFromProps(props, state) {
    const id = props.match.params.id;
    if (id !== state.prevId) {
      return {
        prevId: id,
        needUpdate: true,
      };
    }

    return null;
  }

  loadData() {
    this.props.getMovie(this.props.match.params.id).then(() => {
      this.props.findMoviesForCurrentMovie();
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.needUpdate) {
      this.loadData();
      this.setState({needUpdate: false});
    }
  }

  render() {
    return (
      <MasterPage 
        headerContent={<MovieDetails />}
        pageContent={<MovieList />}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMovie: (data) => dispatch(getMovie(data)),
    findMovies: (data) => dispatch(findMovies(data)),
    findMoviesForCurrentMovie: (data) => dispatch(findMoviesForCurrentMovie(data)),
  };
}

export default connect(null, mapDispatchToProps)(MovieDetailsPage);
