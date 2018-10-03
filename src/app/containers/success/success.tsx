import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Icon, Message } from 'semantic-ui-react'

import { Event, EventState, RootState, TeamState } from "../../models";

import './success.css';

interface ComponentDispatchProps {
}

interface ComponentStateProps {
  eventState: EventState;
  teamState: TeamState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class Success extends Component<ComponentProps> {

  public render(): ReactNode {
    const event = this.getSelectedEvent();
    const { successMessage } = event;
    return (
      <div>
        <Message info><Icon name='smile outline' /> {successMessage}</Message>
      </div>
    );
  }

  private getSelectedEvent = (): Event => {
    const { eventState } = this.props;
    return eventState.events[0];
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
});

const SuccessContainer = connect(mapStateToProps, mapDispatchToProps)(Success);

export { SuccessContainer };
