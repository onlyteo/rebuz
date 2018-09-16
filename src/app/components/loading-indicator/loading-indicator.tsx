import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Loader } from 'semantic-ui-react'

class LoadingIndicator extends Component {

    public render(): ReactNode {
        return (
            <Loader active />
        );
    }
}

export { LoadingIndicator };