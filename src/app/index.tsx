import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'

import { store } from './state/store'
import { MainHeader } from './components';
import { ErrorHandler } from './containers/error';
import { NotFoundContainer } from './containers/error';
import { HomeContainer } from './containers/home';
import { EventsContainer } from './containers/events';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const Root = () => {
    return (
        <Provider store={store}>
            <ErrorHandler>
                <Container>
                    <MainHeader title='Rebuz' />
                    <Segment vertical>
                        <Router>
                            <Switch>
                                <Route path="/event/:eventId?" component={EventsContainer} />
                                <Route path="/" exact component={HomeContainer} />
                                <Route component={NotFoundContainer} />
                            </Switch>
                        </Router>
                    </Segment>
                </Container>
            </ErrorHandler>
        </Provider>
    );
}

render(
    <Root />,
    document.getElementById('root'),
);
