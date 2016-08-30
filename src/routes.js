import React from 'react';
import { Route, Router } from 'react-router';
import Home from './containers/Home/';
import NotFound from './containers/NotFound';
import MovieDetail from './containers/MovieDetail/';

export default history => 
    (
        <Router history={history}>
            <Route path="/" component={Home} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="*" component={NotFound} />
        </Router>
    );
