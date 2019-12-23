import React from 'react';
import {connect} from 'react-redux';

import Rating from '../TextStyling/Rating/Rating';
import Measure from '../TextStyling/Measure/Measure';
import Poster from '../Poster/Poster';

import indexStyles  from '../../styles/index.module.scss';
import styles  from './MovieDetails.module.scss';
import Genres from '../TextStyling/Genres/Genres';

function MovieDetails(props) {
    const movie = props.movie;
    return (
        <div className={`${styles.movieDetails} ${indexStyles.flexContainer}`}>
            <Poster url={movie.poster_path} width="200px" />
            <div className={styles.movieTextInfo}>
                <div className={indexStyles.flexContainer}>
                    <div className={styles.movieTitle}>{movie.title}</div>
                    <Rating value={movie.vote_average} />
                </div>
                <Genres genres={movie.genres} />
                <div className={indexStyles.flexContainer}>
                    <Measure value={new Date(movie.release_date).getFullYear()} unit="year" />
                    <Measure value={movie.runtime} unit="mins" />
                </div>
                <div className={indexStyles.flexContainer}>{movie.overview}</div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
  return {movie: state.selectedMovie}
}

export default connect(mapStateToProps)(MovieDetails);
