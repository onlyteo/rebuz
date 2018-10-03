import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';

import { EventState, RootState, TeamState } from "../../models";
import { findEvents, getTeam } from '../../state/actions';
import { TeamsContainer } from '../teams';
import { QuestionsContainer } from '../questions';
import { SuccessContainer } from '../success';

import './events.css';

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  match?: any;
  history?: any;
  eventState: EventState;
  teamState: TeamState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class Events extends Component<ComponentProps> {

  componentDidMount() {
    const { eventId } = this.props.match.params;

    if (eventId) {
      this.props.findEvents(eventId);
      this.props.getTeam(eventId);
    }
  }

  public render(): ReactNode {
    return (
      <Switch>
        <Route exact path="/event/:eventId?" component={TeamsContainer} />
        <Route exact path="/event/:eventId?/question/:questionId?" component={QuestionsContainer} />
        <Route exact path="/event/:eventId?/success" component={SuccessContainer} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  getTeam: (id: string) => dispatch(getTeam(id))
});

const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);

export { EventsContainer };
