import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {
  searchText: '',
  searchBy: 'title',
  sortBy: 'release_date',
  movies: [],
  selectedMovie: {},
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;