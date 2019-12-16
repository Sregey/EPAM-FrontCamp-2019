import React from 'react';
import indexStyles  from '../../styles/index.module.scss';
import styles  from './MovieDetails.module.scss';
import Rating from '../TextStyling/Rating/Rating';
import Measure from '../TextStyling/Measure/Measure';
import Poster from '../Poster/Poster';

function MovieDetails(props) {
    return (
        <div className={indexStyles.flexContainer}>
            <Poster url={props.details.imageUrl} width="200px" />
            <div className={styles.movieTextInfo}>
                <div className={indexStyles.flexContainer}>
                    <div className={styles.movieTitle}>{props.details.title}</div>
                    <Rating value={props.details.rating} />
                </div>
                <div>{props.details.genre}</div>
                <div className={indexStyles.flexContainer}>
                    <Measure value={props.details.year} unit="year" />
                    <Measure value={props.details.mins} unit="mins" />
                </div>
                <div className={indexStyles.flexContainer}>{props.details.description}</div>
            </div>
        </div>
    );
}

export default MovieDetails;