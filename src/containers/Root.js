import React from 'react';
import { Provider, connect } from 'react-redux';
import createRouter from '../routes';

export default class Root extends React.PureComponent {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                {createRouter(history)}
            </Provider>
        );
    }
}