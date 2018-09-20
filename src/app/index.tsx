import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './state/store'
import { ErrorHandler } from './containers/error';
import { RootContainer } from './containers/root';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const App = () => {
    return (
        <Provider store={store}>
            <ErrorHandler>
                <Router>
                    <Route component={RootContainer} />
                </Router>
            </ErrorHandler>
        </Provider>
    );
}

render(
    <App />,
    document.getElementById('root'),
);
