import * as React from 'react';
import { render } from 'react-dom';

import { Routes } from './core';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

function Root() {
    return (
        <Routes />
    );
}

render(
    <Root />,
    document.getElementById('root'),
);
