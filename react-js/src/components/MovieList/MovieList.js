import React from 'react';
import MovieListItem from './MovieListItem/MovieListItem';
import styles from './MovieList.module.scss';

function MovieList() {
  let details = {
    title: 'Blade Runner 2049',
    genre: 'Action',
    year: 2018,
    mins: 120,
    rating: 4.3,
    imageUrl: "https://www.movieartarena.com/imgs/bladerunner2049ff.jpg",
    description: 'Him rendered may attended concerns jennings reserved now. Sympathize did now preference unpleasing mrs few. Mrs for hour game room want are fond dare. For detract charmed add talking age. Shy resolution instrument unreserved man few. She did open find pain some out. If we landlord stanhill mr whatever pleasure supplied concerns so. Exquisite by it admitting cordially september newspaper an. Acceptance middletons am it favourable. It it oh happen lovers afraid. '
  };
  return (
    <div className={styles.movieList}>
        <MovieListItem details={details} />
        <MovieListItem details={details} />
        <MovieListItem details={details} />
        <MovieListItem details={details} />
        <MovieListItem details={details} />
        <MovieListItem details={details} />
        <MovieListItem details={details} />
    </div>
  );
}

export default MovieList;
