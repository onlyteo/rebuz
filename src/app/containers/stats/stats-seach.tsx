import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';

import { StatsForm } from './stats-form'

import './stats.css';
import { Redirect } from 'react-router';

interface ComponentState {
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formErrorMessage?: string;
}

type ComponentProps = {};

const initialState: ComponentState = {
  formSubmitted: false,
  formError: false,
  formEventId: ''
}

class StatsSearch extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  public render(): ReactNode {
    const { formEventId, formSubmitted, formError, formErrorMessage } = this.state;

    if (formSubmitted && !formError) {
      const path = `/stats/${formEventId}`;
      return <Redirect to={path} />
    } else {
      return (
        <StatsForm formEventId={formEventId} formError={formError} formErrorMessage={formErrorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
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

export { StatsSearch as StatsSearchContainer };
