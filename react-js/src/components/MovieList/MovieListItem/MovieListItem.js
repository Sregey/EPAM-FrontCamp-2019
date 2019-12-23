import React from 'react';
import { Link } from 'react-router-dom';

import Poster from '../../Poster/Poster';
import Genres from '../../TextStyling/Genres/Genres'

import styles from './MovieListItem.module.scss';

function MovieListItem(props) {
  const movie = props.movie;
  const linkToMovie = `/film/${movie.id}`;
  return (
    <div className={styles.movieListItem} title={movie.title}>
    <Link to={linkToMovie}><Poster url={movie.poster_path} width="200px" /></Link>
    <div>
      <div className={`${styles.titleAndYear}`}>
        <div className={styles.title}><Link to={linkToMovie}>{movie.title}</Link></div>
        <div className={styles.year}>{new Date(movie.release_date).getFullYear()}</div>
      </div>
      <Genres genres={movie.genres} className={styles.genre} />
    </div>
  </div>
  );
}

export default MovieListItem;
