import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middleware/api';


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, api),
        )
    );

    // if (module.hot) {
    //     // 启动webpack-dev热替换
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers').default;
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store;
}