const rootReducer = function(state, action) {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
        return {...state, searchText: action.text};
        case 'SET_SEARCH_STATUS':
        return {...state, searchStatus: action.text};
        case 'SET_SEARCH_BY':
        return {...state, searchBy: action.value};
        case 'SET_SORT_BY':
        return {...state, sortBy: action.value};
        case 'STORE_MOVIE':
        return {...state, selectedMovie: action.movie};
        case 'STORE_MOVIES':
        return {...state, movies: action.movies};
        default:
        return state;
    }
};

export default rootReducer;