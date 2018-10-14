import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Table } from 'semantic-ui-react'

import { EventState, StatsState, TeamState } from "../../models";
import { defaultLink, LoadingIndicator, NotificationMessage, LinkProps } from '../../components';

import './stats.css';

interface ComponentProps {
  eventId?: any;
  eventState: EventState;
  teamState: TeamState;
  statsState: StatsState;
}

class StatsResults extends Component<ComponentProps> {

  public render(): ReactNode {
    const { eventId, eventState, statsState, teamState } = this.props;
    const { loading: eventsLoading, events } = eventState;
    const { loading: teamLoading, teams, teamMap } = teamState;
    const { loading: statsLoading, stats } = statsState;

    const backLink: LinkProps = { ...defaultLink, path: '/stats', text: 'Back to stats search' };

    if (!eventId) {
      return <NotificationMessage error link={backLink} message='No event id selected' />
    } else if (eventsLoading || statsLoading || teamLoading) {
      return <LoadingIndicator />
    } else if (events && events.length && stats && stats.length && teams && teams.length) {
      const statList = stats.map((stat) => {
        const { team: teamId, question: questionId, created, modified } = stat;
        const team = teamMap[teamId];
        const { name: teamName, questions } = team || { name: '', questions: [] };
        const questionNumber = questions.indexOf(questionId) + 1;
        const createdTimeString = timestampToString(created);
        const modifiedTimeString = timestampToString(modified);
        return {
          teamName: teamName,
          questionNumber: questionNumber,
          createdTime: createdTimeString,
          modifiedTime: modifiedTimeString
        };
      });
      return (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Modified</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {statList.sort().map((stat, index) => {
                const { teamName, questionNumber, createdTime, modifiedTime } = stat;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{teamName}</Table.Cell>
                    <Table.Cell>{questionNumber}</Table.Cell>
                    <Table.Cell>{createdTime}</Table.Cell>
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

const timestampToString = (timestamp: number): string => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(timestamp);
  return dateTime.toLocaleString('nb-NO');
}

export { StatsResults as StatsResultsContainer };
