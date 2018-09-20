import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

import { NotificationMessage, LoadingIndicator } from '../../components';
import { Event, EventState, RootState, Team, TeamState } from "../../models";
import { findEvents, getTeam } from '../../state/actions';

import './events.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectQuestionId?: string;
  selectedEvent?: Event;
  selectedTeam?: Team;
}

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  eventState: EventState;
  teamState: TeamState;
  match?: any;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  shouldRedirect: false
}

class Events extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { eventId } = this.props.match.params;

    if (eventId) {
      this.props.findEvents(eventId);
      this.props.getTeam(eventId);
    }
  }

  componentDidUpdate() {
    const { eventId } = this.props.match.params;
    const { eventState, teamState } = this.props;
    const { selectedEvent, selectedTeam } = this.state;

    if (eventId && !selectedEvent && !selectedTeam && eventState && teamState) {
      const { events, loading: eventsLoading } = eventState;
      const { teams, loading: teamsLoading } = teamState;

      if (!eventsLoading && !teamsLoading && events && events.length > 0 && teams && teams.length > 0) {
        const newState = { selectedEvent: events[0], selectedTeam: teams[0] }
        this.setState(newState);
      }
    }
  }

  public render(): ReactNode {
    const { eventId } = this.props.match.params;
    const { shouldRedirect, redirectQuestionId, selectedEvent, selectedTeam } = this.state
    const { loading: eventsLoading } = this.props.eventState;
    const { loading: teamsLoading } = this.props.teamState;

    if (shouldRedirect) {
      const path = `/event/${eventId}/question/${redirectQuestionId}`;
      return <Redirect to={path} />
    } else if (eventId) {
      if (eventsLoading || teamsLoading) {
        return <LoadingIndicator />
      } else if (selectedEvent && selectedTeam) {
        const { name: eventName } = selectedEvent;
        const { name: teamName, questions } = selectedTeam;
        return (
          <div>
            <h3>Welcome to {eventName}</h3>
            <h4>Your are team {teamName}</h4>
            <p>
              <Button primary id={questions[0]} onClick={() => this.handleClick(selectedTeam)}>
                Start rebuz! <Icon name="arrow right" />
              </Button>
            </p>
          </div>
        );
      } else {
        return <NotificationMessage error message='No event found for id' />
      }
    } else {
      return <NotificationMessage error message='No event id selected' />
    }
  }

  private handleClick = (team: Team) => {
    const newState = { shouldRedirect: true, redirectQuestionId: team.questions[0] }
    this.setState(newState);
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
