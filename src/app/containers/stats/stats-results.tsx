import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Form, FormProps, Table, Icon } from 'semantic-ui-react'

import { findStats, removeStats } from '../../state/actions';
import { RootState, EventState, StatsState, TeamState } from "../../models";
import { defaultLink, LoadingIndicator, NotificationMessage, LinkProps } from '../../components';

import './stats.css';

interface ComponentDispatchProps {
  findStats: (eventId: string) => Promise<any>;
  removeStats: (eventId: string) => Promise<any>;
}

interface ComponentStateProps {
}

interface ComponentLocalProps {
  eventId?: any;
  eventState: EventState;
  teamState: TeamState;
  statsState: StatsState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps & ComponentLocalProps;

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
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
              <Form.Button primary>
                Delete stats <Icon name="delete" />
              </Form.Button>
            </Form.Group>
          </Form>
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

  private onFormSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    const { eventId } = this.props;
    this.props.removeStats(eventId);
    this.props.findStats(eventId);
  }
}

const timestampToString = (timestamp: number): string => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(timestamp);
  return dateTime.toLocaleString('nb-NO');
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findStats: (eventId: string) => dispatch(findStats(eventId)),
  removeStats: (eventId: string) => dispatch(removeStats(eventId))
});

const StatsResultsContainer = connect(mapStateToProps, mapDispatchToProps)(StatsResults);

export { StatsResultsContainer };
