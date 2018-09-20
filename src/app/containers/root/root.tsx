import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Container, Segment } from 'semantic-ui-react'

import { Event, EventState, RootState, Team, TeamState } from "../../models";
import { findEvents, getTeam } from '../../state/actions';
import { MainHeader } from '../../components';
import { NotFoundContainer } from '../error';
import { HomeContainer } from '../home';
import { EventsContainer } from '../events';
import { QuestionsContainer } from '../questions';

import './root.css';

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  eventState: EventState;
  teamState: TeamState;
  selectedEvent?: Event;
  selectedTeam?: Team;
  match?: any;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class Root extends Component<ComponentProps> {

  componentDidMount() {
    const { eventId } = this.props.match.params;

    if (eventId) {
      this.props.findEvents(eventId);
      this.props.getTeam(eventId);
    }
  }

  public render(): ReactNode {

    return (
      <Container>
        <MainHeader title='Rebuz' />
        <Segment vertical>
          <Switch>
            <Route path="/event/:eventId?/question/:questionId?" component={QuestionsContainer} />
            <Route path="/event/:eventId?" component={EventsContainer} />
            <Route path="/" exact component={HomeContainer} />
            <Route component={NotFoundContainer} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams,
  selectedEvent: state.selectedEvent,
  selectedTeam: state.selectedTeam
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  getTeam: (id: string) => dispatch(getTeam(id))
});

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);

export { RootContainer };
