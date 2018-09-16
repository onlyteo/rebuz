import * as React from 'react';
import { Component, ReactNode } from 'react';

import { GenericPage, LoadingIndicator } from '../';

interface ComponentProps {
}

class LoadingPage extends Component<ComponentProps> {

    public render(): ReactNode {
        return (
            <GenericPage>
                <LoadingIndicator />
            </GenericPage>
        );
    }
}

export { LoadingPage };