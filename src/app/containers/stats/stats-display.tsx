import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react'

import { RootState, EventState, StatsState, TeamState } from "../../models";
import { findStats, getEvent, getTeam } from '../../state/actions';
import { defaultLink, LoadingIndicator, NotificationMessage, LinkProps } from '../../components';

import './stats.css';

interface ComponentDispatchProps {
  getEvent: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
  findStats: (eventId: string) => Promise<any>;
}

interface ComponentStateProps {
  match?: any;
  eventState: EventState;
  teamState: TeamState;
  statsState: StatsState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class StatsDisplay extends Component<ComponentProps> {

  componentDidMount() {
    const { eventId } = this.props.match.params;
    if (eventId) {
      this.props.getEvent(eventId);
      this.props.findStats(eventId);
    }
  }

  componentDidUpdate() {
    const { eventId } = this.props.match.params;
    const { eventState, teamState } = this.props;
    const { loading: eventsLoading, eventMap } = eventState;
    const { loading: teamsLoading, teamMap } = teamState;

    if (eventId && !eventsLoading && eventMap && eventMap[eventId]) {
      const event = eventMap[eventId];
      if (event) {
        event.teams.forEach(team => {
          if (!teamsLoading && !teamMap[team]) {
            this.props.getTeam(team);
          }
        });
      }
    }
  }

  public render(): ReactNode {
    const { eventId } = this.props.match.params;
    const { eventState, statsState, teamState } = this.props;
    const { loading: eventsLoading, events, eventMap } = eventState;
    const { loading: teamLoading, teams, teamMap } = teamState;
    const { loading: statsLoading, stats } = statsState;

    const backLink: LinkProps = { ...defaultLink, path: '/stats', text: 'Back to stats search' };

    if (!eventId) {
      return <NotificationMessage error link={backLink} message='No event id selected' />
    } else if (eventsLoading || statsLoading || teamLoading) {
      return <LoadingIndicator />
    } else if (events && events.length && stats && stats.length && teams && teams.length) {
      const event = eventMap[eventId];
      const { welcomeMessage } = event;
      const statList = stats.map((stat) => {
        const { team: teamId, question: questionId, modified } = stat;
        const team = teamMap[teamId];
        const { name: teamName, questions } = team;
        const questionNumber = questions.indexOf(questionId) + 1;
        const modifiedTime = new Date(0);
        modifiedTime.setUTCSeconds(modified);
        const modifiedTimeString = modifiedTime.toLocaleString('nb-NO');
        return {
          teamName: teamName,
          questionNumber: questionNumber,
          modifiedTime: modifiedTimeString
        };
      });
      return (
        <div>
          <h3>{welcomeMessage}</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Last modified</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {statList.sort().map((stat, index) => {
                const { teamName, questionNumber, modifiedTime } = stat;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{teamName}</Table.Cell>
                    <Table.Cell>{questionNumber}</Table.Cell>
                    <Table.Cell>{modifiedTime}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return <NotificationMessage error link={backLink} message={`No stats found for event id "${eventId}"`} />
    }
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams,
  statsState: state.stats
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  getEvent: (id: string) => dispatch(getEvent(id)),
  getTeam: (id: string) => dispatch(getTeam(id)),
  findStats: (eventId: string) => dispatch(findStats(eventId)),
});

const StatsDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(StatsDisplay);

export { StatsDisplayContainer };
