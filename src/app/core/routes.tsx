import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

import { createHistory } from './';
import { NotFoundContainer } from '../containers/error';
import { HomeContainerConnected } from '../containers/home';
import { EventContainerConnected } from '../containers/event';

const Routes = () => (
    <Router history={createHistory()}>
        <Switch>
            <Route path="/event/:id?" component={EventContainerConnected} />
            <Route path="/" exact component={HomeContainerConnected} />
            <Route path="*" component={NotFoundContainer} />
        </Switch>
    </Router>
);

export { Routes };
