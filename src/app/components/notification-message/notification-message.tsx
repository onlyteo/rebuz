import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { Link } from 'react-router-dom'
import { Icon, Message } from 'semantic-ui-react'

interface ComponentProps {
    message: string;
    info?: boolean;
    warning?: boolean;
    error?: boolean;
}

class NotificationMessage extends Component<ComponentProps> {

    public render(): ReactNode {
        const { message, error, warning } = this.props;
        if (error) {
            return <ErrorMessage message={message} />
        } else if (warning) {
            return <WarningMessage message={message} />
        } else {
            return <InfoMessage message={message} />
        }
    }
}

const InfoMessage: SFC<{ message: string }> = (props) => {
    return (
        <Message info><Icon name='info circle' /> {props.message}<br />
            <Link to='/'><Icon name='home' />Go to home page</Link>
        </Message>
    );
}

const WarningMessage: SFC<{ message: string }> = (props) => {
    return (
        <Message warning><Icon name='warning sign' /> {props.message}<br />
            <Link to='/'><Icon name='home' />Go to home page</Link>
        </Message>
    );
}

const ErrorMessage: SFC<{ message: string }> = (props) => {
    return (
        <Message error><Icon name='ban' /> {props.message}<br />
            <Link to='/'><Icon name='home' />Go to home page</Link>
        </Message>
    );
}

export { NotificationMessage };