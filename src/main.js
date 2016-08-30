import 'babel-polyfill';
import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore(window.__initState__);

render(
    <Root store={store} history={browserHistory} />,
    document.getElementById('app'),
);