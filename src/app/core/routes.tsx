import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

import { createHistory } from './';
import { NotFound } from '../containers/error';
import Home from '../containers/home';

const Routes = () => (
    <Router history={createHistory()}>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export { Routes };
