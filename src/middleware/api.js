import 'isomorphic-fetch';
const API_ROOT = 'http://127.0.0.1:8888/api';

export function callApi(endpoint, params) {
    const fullUrl = API_ROOT + endpoint;

    const headers = new Headers();
    headers.append('Content-type', 'application/json; charset=UTF-8');

    return fetch(fullUrl)
        .then(res => res.json())
        .then(res => { 
            res.receivedAt = Date.now();
            return res;
        })
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { types, params, callBack } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }
    if (typeof endpoint !== 'string' || endpoint.substring(0, 1) !== '/') {
        throw new Error(`接口地址${API_ROOT}${endpoint}有问题`);
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType }));

    return callApi(endpoint, params, callBack).then(
        res => next(actionWith({
            res,
            type: successType
        })),
        err => next(actionWith({
            type: failureType,
            err: err.message || 'something bad happened'
        }))
    );
};