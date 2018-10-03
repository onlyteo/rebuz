import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { Link } from 'react-router-dom'
import { Icon, Message } from 'semantic-ui-react'

interface ComponentProps {
    message: string;
    info?: boolean;
    warning?: boolean;
    error?: boolean;
    withLink?: boolean;
}

interface MessageProps {
    message: string;
    withLink?: boolean;
}

class NotificationMessage extends Component<ComponentProps> {

    public render(): ReactNode {
        const { message, error, warning, withLink } = this.props;
        if (error) {
            return <ErrorMessage message={message} withLink={withLink} />
        } else if (warning) {
            return <WarningMessage message={message} withLink={withLink} />
        } else {
            return <InfoMessage message={message} withLink={withLink} />
        }
    }
}

const InfoMessage: SFC<MessageProps> = (props) => {
    const { message, withLink } = props;
    if (withLink) {
        return (
            <Message info>
                <Icon name='info circle' /> {message}<br /><br />
                <Link to='/'><Icon name='home' />Go to home page</Link>
            </Message>
        );
    } else {
        return (
            <Message info>
                <Icon name='info circle' /> {message}
            </Message>
        );
    }
}

const WarningMessage: SFC<MessageProps> = (props) => {
    const { message, withLink } = props;
    if (withLink) {
        return (
            <Message warning>
                <Icon name='warning sign' /> {message}<br /><br />
                <Link to='/'><Icon name='home' />Go to home page</Link>
            </Message>
        );
    } else {
        return (
            <Message warning>
                <Icon name='warning sign' /> {message}
            </Message>
        );
    }
}

const ErrorMessage: SFC<MessageProps> = (props) => {
    const { message, withLink } = props;
    if (withLink) {
        return (
            <Message error>
                <Icon name='ban' /> {message}<br /><br />
                <Link to='/'><Icon name='home' />Go to home page</Link>
            </Message>
        );
    } else {
        return (
            <Message error>
                <Icon name='ban' /> {message}
            </Message>
        );
    }
}

export { NotificationMessage };