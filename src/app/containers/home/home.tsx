import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { RootState } from "../../models";
import { HomeForm } from './home-form'

import './home.css';

interface ComponentState {
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formErrorMessage?: string;
}

interface ComponentDispatchProps {
}

interface ComponentStateProps {
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  formSubmitted: false,
  formError: false,
  formEventId: ''
}

class Home extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  public render(): ReactNode {
    const { formEventId, formSubmitted, formError, formErrorMessage } = this.state

    if (formSubmitted && !formError) {
      const path = `/event/${formEventId}`;
      return <Redirect to={path} />
    } else {
      return (
        <HomeForm formEventId={formEventId} formError={formError} formErrorMessage={formErrorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
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
      this.setFormSubmittedState();
    } else {
      this.setFormErrorState('Event id must be a six character code');
    }
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
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export { HomeContainer };
