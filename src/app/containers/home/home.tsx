import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Container, Form, Message, Segment } from 'semantic-ui-react'

import { HeaderComponent } from '../../components/header';
import { EventState, RootState } from "../../models";
import { findEvents } from '../../state/actions';

import './home.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectEventId: string;
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formInputPlaceholder: string;
  formButtonIcon: string;
  formErrorMessage: string;
}

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  push: (location: string) => RouterAction;
}

interface ComponentStateProps {
  events: EventState;
  error: any;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  shouldRedirect: false,
  redirectEventId: '',
  formEventId: '',
  formSubmitted: false,
  formError: false,
  formInputPlaceholder: 'Enter event id...',
  formButtonIcon: 'arrow right',
  formErrorMessage: '',
}

class HomeContainer extends Component<ComponentProps, ComponentState> {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const { formEventId, formSubmitted, formError } = this.state;
    const { events, loading } = this.props.events;

    if (formSubmitted && !formError && !loading) {
      if (!events || events.length < 1) {
        this.setFormError(`No event found for id "${formEventId}"`);
      } else if (events.length > 1) {
        this.setFormError(`More than one event found for id "${formEventId}"`);
      } else {
        const newState = { shouldRedirect: true, redirectEventId: formEventId }
        this.setState(newState);
      }
    }
  }

  public render(): ReactNode {

    const { formEventId, shouldRedirect, redirectEventId, formSubmitted, formError, formErrorMessage, formInputPlaceholder, formButtonIcon } = this.state

    if (shouldRedirect) {
      const path = `/event/${redirectEventId}`;
      return <Redirect to={path} />
    } else {
      return (
        <Container>
          <HeaderComponent />
          <Segment vertical>
            <Form onSubmit={this.handleSubmit} error={formError}>
              <Form.Group>
                <Form.Input placeholder={formInputPlaceholder} value={formEventId} onChange={this.handleChange} error={formError} />
                <Form.Button primary icon={formButtonIcon} loading={formSubmitted} />
              </Form.Group>
              <Message error>{formErrorMessage}</Message>
            </Form>
          </Segment>
        </Container>
      );
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const newState = { formEventId: value, formError: false, formSubmitted: false }
    this.setState(newState);
  }

  private handleSubmit = () => {
    const { formEventId } = this.state;

    if (formEventId.length == 6) {
      const newState = { formSubmitted: true, formError: false }
      this.setState(newState);
      this.props.findEvents(formEventId);
    } else {
      this.setFormError('Event id must be a six character code');
    }
  }

  private setFormError = (message: string) => {
    const newState = { formSubmitted: false, formError: true, formErrorMessage: message }
    this.setState(newState);
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  events: state.events,
  error: null
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  push: (location: string) => dispatch(push(location))
});

const HomeContainerConnected = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export { HomeContainerConnected };
