import * as React from 'react';
import { Component, ReactNode } from 'react';

import { GenericPage, NotificationMessage } from '../';

interface ComponentProps {
    message: string;
    info?: boolean;
    warning?: boolean;
    error?: boolean;
}

class NotificationPage extends Component<ComponentProps> {

    public render(): ReactNode {
        const { message, error, warning, info } = this.props;

        return (
            <GenericPage>
                <NotificationMessage message={message} error={error} warning={warning} info={info} />
            </GenericPage>
        );
    }
}

export { NotificationPage };