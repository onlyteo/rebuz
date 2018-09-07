import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

import { createHistory } from './';
import { NotFoundContainer } from '../containers/error';
import { HomeContainer } from '../containers/home';
import { EventContainerConnected } from '../containers/event';

const Routes = () => (
    <Router history={createHistory()}>
        <Switch>
            <Route path="/event" component={EventContainerConnected} />
            <Route path="/" exact component={HomeContainer} />
            <Route path="*" component={NotFoundContainer} />
        </Switch>
    </Router>
);

export { Routes };