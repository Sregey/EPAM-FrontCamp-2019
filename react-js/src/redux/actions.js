import MovieService from '../services/movieService';

export const setSearchText = (text) => ({
  type: 'SET_SEARCH_TEXT',
  text: text
});

export const setSearchBy = (value) => ({
  type: 'SET_SEARCH_BY',
  value: value
});

export const setSortBy = (value) => ({
  type: 'SET_SORT_BY',
  value: value
});

export const setSearchStatus = (text) => ({
  type: 'SET_SEARCH_STATUS',
  text: text
});

export const storeMovie = (movie) => ({
  type: 'STORE_MOVIE',
  movie: movie
});

export const storeMovies = (movies) => ({
  type: 'STORE_MOVIES',
  movies: movies
});

export const getMovie = (id) => {
  return function(dispatch) {
    const movieService = new MovieService();
    return movieService.getMovie(id).then(
      (movie) => dispatch(storeMovie(movie)),
      (error) => console.log(error),
    );
  };
}

export const findMoviesForCurrentMovie = () => {
  return function(dispatch, getState) {
    const state = getState();
    const searchParams = {
      search: state.selectedMovie.genres[0],
      searchBy: 'genres',
      sortBy: state.sortBy,
      sortOrder: 'desc'
    };
    const movieService = new MovieService();
    return movieService.getMovies(searchParams).then(
      (movies) => {
        dispatch(storeMovies(movies));
        dispatch(setSearchStatus(`Films by ${state.selectedMovie.genres[0]} genre`));
      },
      (error) => console.log(error),
    );
  };
}

export const findMovies = (text) => {
  return function(dispatch, getState) {
    text = text ? text : '';
    const state = getState();
    const searchParams = {
      search: text,
      searchBy: state.searchBy,
      sortBy: state.sortBy,
      sortOrder: 'desc'
    };
    const movieService = new MovieService();
    return movieService.getMovies(searchParams).then(
      (movies) => {
        dispatch(storeMovies(movies));
        const status = (movies.total > 0) ? `${movies.total} movies found` : '';
        dispatch(setSearchText(text));
        dispatch(setSearchStatus(status));
      },
      (error) => console.log(error),
    );
  };
}