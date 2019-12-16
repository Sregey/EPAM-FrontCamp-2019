import React from 'react';
import indexStyles  from '../../../styles/index.module.scss';
import styles from './MovieListItem.module.scss';
import Poster from '../../Poster/Poster';

function MovieListItem(props) {
  return (
    <div className={styles.movieListItem}>
    <Poster url={props.details.imageUrl} width="200px" />
    <div>
      <div className={`${styles.titleAndYear} ${indexStyles.twoSideItems}`}>
        <div className={styles.title}>{props.details.title}</div>
        <div className={styles.year}>{props.details.year}</div>
      </div>
      <div className={styles.genre}>{props.details.genre}</div>
    </div>
  </div>
  );
}

export default MovieListItem;
