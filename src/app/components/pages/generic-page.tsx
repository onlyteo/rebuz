import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Container, Segment } from 'semantic-ui-react'

import { MainHeader } from '../';

interface ComponentProps {
}

class GenericPage extends Component<ComponentProps> {

    public render(): ReactNode {
        const { children } = this.props;

        return (
            <Container>
                <MainHeader />
                <Segment vertical>{children}</Segment>
            </Container>
        );
    }
}

export { GenericPage };