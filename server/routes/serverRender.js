import { RouterContext, match } from 'react-router';
import crateRoutes from '../../src/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import express from 'express';
import configureStore from '../../src/store/configureStore';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import path from 'path';
import fs from 'fs';

const serverRender = express.Router();

function getReduxPromise(props, store) {
    const comp = props.components[props.components.length - 1].WrappedComponent;
    return comp.loadData ?
        comp.loadData({ store, props }) :
        Promise.resolve();
}



serverRender.route('*')
    .get((req, res) => {
        const history = createMemoryHistory();
        const store = configureStore();
        const routes = crateRoutes(history);

        match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (error) {
                res.send(500, error.message);
            } else if (renderProps === null) {
                res.send(404, 'Not found');
            } else if (renderProps) {
                getReduxPromise(renderProps, store).then(() => {
                    const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {<RouterContext {...renderProps} />}
                        </Provider>
                    );

                    res.render('index.ejs', { html, reduxState });
                }).catch(e => {
                    console.log(e);
                });
            }
        });
});

export default serverRender;