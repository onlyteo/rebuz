import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import { store } from './state/store'
import { Routes } from './core';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const Root = () => {
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
