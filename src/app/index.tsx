import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducers'
import { Routes } from './core';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(rootReducer)

function Root() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

render(
    <Root />,
    document.getElementById('root'),
);
