import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { GenericPage, LoadingPage } from '../../components';
import { EventState, RootState } from "../../models";
import { findEvents } from '../../state/actions';
import { HomeForm } from './home-form'

import './home.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectEventId?: string;
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formErrorMessage?: string;
}

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  eventState: EventState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  shouldRedirect: false,
  formSubmitted: false,
  formError: false,
  formEventId: ''
}

class HomeContainer extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const { formEventId, formSubmitted } = this.state;
    const { eventState } = this.props;

    if (formSubmitted && eventState && !eventState.loading) {
      const { events } = eventState;

      if (!events || events.length < 1) {
        this.setFormErrorState(`No event found for id "${formEventId}"`);
      } else if (events.length > 1) {
        this.setFormErrorState(`More than one event found for id "${formEventId}"`);
      } else {
        this.setRedirectState(formEventId);
      }
    }
  }

  public render(): ReactNode {
    const { formEventId, shouldRedirect, redirectEventId, formError, formErrorMessage } = this.state
    const { eventState } = this.props;

    if (shouldRedirect) {
      const path = `/event/${redirectEventId}`;
      return <Redirect to={path} />
    } else if (eventState && eventState.loading) {
      return <LoadingPage />
    } else {
      return (
        <GenericPage>
          <HomeForm formEventId={formEventId} formError={formError} formErrorMessage={formErrorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        </GenericPage>
      );
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    this.setFormUpdatedState(value);
  }

  private handleSubmit = () => {
    const { formEventId } = this.state;

    if (formEventId && formEventId.length == 6) {
      this.props.findEvents(formEventId);
      this.setFormSubmittedState();
    } else {
      this.setFormErrorState('Event id must be a six character code');
    }
  }

  private setRedirectState = (formEventId: string) => {
    const newState = { shouldRedirect: true, redirectEventId: formEventId, formError: false, formErrorMessage: undefined }
    this.setState(newState);
  }

  private setFormSubmittedState = () => {
    const newState = { formSubmitted: true, formError: false, formErrorMessage: undefined }
    this.setState(newState);
  }

  private setFormUpdatedState = (formEventId: string) => {
    const newState = { formEventId: formEventId, formSubmitted: false, formError: false, formErrorMessage: undefined }
    this.setState(newState);
  }

  private setFormErrorState = (message: string) => {
    const newState = { formSubmitted: false, formError: true, formErrorMessage: message }
    this.setState(newState);
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id))
});

const HomeContainerConnected = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export { HomeContainerConnected };
