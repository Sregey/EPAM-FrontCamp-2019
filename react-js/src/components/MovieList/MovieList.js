import React from 'react';
import {connect} from 'react-redux';

import {findMovies} from '../../redux/actions'

import MovieListItem from './MovieListItem/MovieListItem';

import styles from './MovieList.module.scss';

class MovieList extends React.Component {
  render() {
    const movies = this.props.movies;

    let content;
    if (!movies) {
      content = null;
    } else if (movies.length === 0) {
      content = <div className={styles.noMoviesText}>No films found</div>;
    } else {
      content = movies.map(movie => <MovieListItem movie={movie} key={movie.id} />);
    }

    return (
      <div className={styles.movieList}>
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {movies: state.movies.data}
}

function mapDispatchToProps(dispatch) {
  return {
    findMovies: (data) => dispatch(findMovies(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
