import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger'
import api from '../middleware/api';


const middleware = [
    thunk,
    api,
    !__NODE__ && createLogger(),
].filter(Boolean);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
        )
    );

    return store;
}