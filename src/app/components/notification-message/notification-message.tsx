import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { Link } from 'react-router-dom'
import { Icon, Message } from 'semantic-ui-react'

export interface LinkProps {
    path: string;
    text: string;
    icon: JSX.Element;
}

interface ComponentProps {
    message: string;
    info?: boolean;
    warning?: boolean;
    error?: boolean;
    link?: LinkProps;
}

interface MessageProps {
    message: string;
    link?: LinkProps;
}

export const defaultLink: LinkProps = {
    path: '/',
    text: 'Go to home page',
    icon: <Icon name='home' />
}

class NotificationMessage extends Component<ComponentProps> {

    public render(): ReactNode {
        const { message, error, warning, link } = this.props;
        if (error) {
            return <ErrorMessage message={message} link={link} />
        } else if (warning) {
            return <WarningMessage message={message} link={link} />
        } else {
            return <InfoMessage message={message} link={link} />
        }
    }
}

const InfoMessage: SFC<MessageProps> = (props) => {
    const { message, link } = props;
    if (link) {
        const { path, text, icon } = link;
        return (
            <Message info>
                <Icon name='info circle' /> {message}<br /><br />
                <Link to={path}>{icon} {text}</Link>
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
    const { message, link } = props;
    if (link) {
        const { path, text, icon } = link;
        return (
            <Message warning>
                <Icon name='warning sign' /> {message}<br /><br />
                <Link to={path}>{icon} {text}</Link>
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
    const { message, link } = props;
    if (link) {
        const { path, text, icon } = link;
        return (
            <Message error>
                <Icon name='ban' /> {message}<br /><br />
                <Link to={path}>{icon} {text}</Link>
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