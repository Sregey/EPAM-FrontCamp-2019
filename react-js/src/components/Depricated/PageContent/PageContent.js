import React from 'react';
import styles  from './PageContent.module.scss';
import MovieList from '../../MovieList/MovieList';

function PageContent() {
    return (
        <div className={styles.pageContent}>
            <MovieList />
        </div>
    );
  }

export default PageContent;