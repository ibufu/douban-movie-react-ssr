import { MOVIE_DETAIL_REQUEST, MOVIE_DETAIL_SUCCESS, MOVIE_DETAIL_FAILURE } from '../constants/actionTypes'
import { CALL_API } from '../middleware/api';

function fetchMovieDetail(id) {
    return {
        [CALL_API]: {
            types: [MOVIE_DETAIL_REQUEST, MOVIE_DETAIL_SUCCESS, MOVIE_DETAIL_FAILURE],
            endpoint: `/movie/subject/${id}`,
        }
    };
}

export function loadMovieDetail(id) {
    return (dispatch, getState) => {
        const { movieDetail } = getState();
        const { receivedAt } = movieDetail;
        const oldId = movieDetail.id;
        if (oldId === id && receivedAt && (Date.now() - receivedAt) < 600000) {
            return null;
        }
        return dispatch(fetchMovieDetail(id))
    };
}