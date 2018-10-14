import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'

import { defaultLink, NotificationMessage, LoadingIndicator } from '../../components';
import { Event, EventState, RootState, Team, TeamState } from "../../models";

import './teams.css';

interface ComponentState {
  currentQuestionId?: string;
}

interface ComponentDispatchProps {
}

interface ComponentStateProps {
  match?: any;
  history?: any;
  eventState: EventState;
  teamState: TeamState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
}

class Teams extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  public render(): ReactNode {
    const { eventId } = this.props.match.params;
    const { currentQuestionId } = this.state;

    if (!eventId) {
      return <NotificationMessage error link={defaultLink} message='No event id selected' />
    } else if (currentQuestionId) {
      const path = `/event/${eventId}/question/${currentQuestionId}`;
      return <Redirect to={path} />
    } else if (this.isLoading()) {
      return <LoadingIndicator />
    } else if (this.isNoEventsFound()) {
      return <NotificationMessage error link={defaultLink} message={`No event found for id "${eventId}"`} />
    } else if (this.isMultipleEventsFound()) {
      return <NotificationMessage error link={defaultLink} message={`Multiple events found for id "${eventId}"`} />
    } else if (this.isNoQuestionsFound()) {
      return <NotificationMessage error link={defaultLink} message={`No questions found for event "${eventId}"`} />
    } else {
      const event = this.getSelectedEvent();
      const team = this.getSelectedTeam();
      const { welcomeMessage } = event;
      const { name: teamName } = team;
      return (
        <div>
          <h3>{welcomeMessage}</h3>
          <h4>You are team <i>{teamName}</i></h4>
          <p>
            <Button primary onClick={() => this.handleClick(team)}>
              Start rebuz! <Icon name="arrow right" />
            </Button>
          </p>
        </div>
      );
    }
  }

  private getSelectedEvent = (): Event => {
    const { eventState } = this.props;
    return eventState.events[0];
  }

  private getSelectedTeam = (): Team => {
    const { teamState } = this.props;
    return teamState.teams[0];
  }

  private isNoEventsFound = (): boolean => {
    const { eventState, teamState } = this.props;
    return (eventState && eventState.events && eventState.events.length == 0) || (teamState && teamState.teams && teamState.teams.length == 0);
  }

  private isMultipleEventsFound = (): boolean => {
    const { eventState, teamState } = this.props;
    return (eventState && eventState.events && eventState.events.length > 1) || (teamState && teamState.teams && teamState.teams.length > 1);
  }

  private isNoQuestionsFound = (): boolean => {
    const { teamState } = this.props;
    return teamState && teamState.teams && teamState.teams.length == 1 && teamState.teams[0].questions && teamState.teams[0].questions.length == 0;
  }

  private isLoading = (): boolean => {
    const { eventState, teamState } = this.props;
    const { loading: eventsLoading } = eventState;
    const { loading: teamsLoading } = teamState;
    return eventsLoading || teamsLoading;
  }

  private handleClick = (team: Team) => {
    const newState = { currentQuestionId: team.questions[0] }
    this.setState(newState);
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
});

const TeamsContainer = connect(mapStateToProps, mapDispatchToProps)(Teams);

export { TeamsContainer };
