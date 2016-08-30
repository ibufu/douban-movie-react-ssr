import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE } from '../constants/actionTypes'
import { CALL_API } from '../middleware/api';

function fetchMovieList() {
    return {
        [CALL_API]: {
            types: [MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE],
            endpoint: '/movie/top250?count=50',
        }
    };
}

export function loadMovieList() {
    return (dispatch, getState) => {
        const { receivedAt } = getState().movieList;
        if (receivedAt && (Date.now() - receivedAt) < 600000) {
            return null;
        }
        return dispatch(fetchMovieList())
    };
}