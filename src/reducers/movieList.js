import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAILURE } from '../constants/actionTypes';

export function movieList(state = {
    movies: [],
    isLoading: false,
}, action) {
    switch (action.type) {
        case MOVIE_LIST_SUCCESS:
            const { subjects, start, receivedAt } = action.res;
            subjects.map((el, index) => {
                el.rank = start + index + 1;
            });
            return {
                movies: subjects,
                receivedAt,
                isLoading: false,
            };
        case MOVIE_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case MOVIE_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}