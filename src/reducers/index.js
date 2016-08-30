import { combineReducers } from 'redux';
import { movieList } from './movieList';
import { movieDetail } from './movieDetail';

export default combineReducers({
    movieList,
    movieDetail,
});