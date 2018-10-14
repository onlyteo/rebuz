import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Table } from 'semantic-ui-react'

import { EventState, StatsState, TeamState, QuestionState } from "../../models";
import { defaultLink, LoadingIndicator, NotificationMessage, LinkProps } from '../../components';

import './stats.css';

interface ComponentProps {
  eventId?: any;
  eventState: EventState;
  teamState: TeamState;
  questionState: QuestionState;
  statsState: StatsState;
}

interface Item {
  teamName: string;
  questionNumber: number;
  detailsText: string;
  questionText: string;
}

class StatsSummary extends Component<ComponentProps> {

  public render(): ReactNode {
    const { eventId, eventState, statsState, teamState, questionState } = this.props;
    const { loading: eventsLoading, events } = eventState;
    const { loading: teamLoading, teams } = teamState;
    const { questionMap } = questionState;
    const { loading: statsLoading } = statsState;

    const backLink: LinkProps = { ...defaultLink, path: '/stats', text: 'Back to stats search' };

    if (!eventId) {
      return <NotificationMessage error link={backLink} message='No event id selected' />
    } else if (eventsLoading || statsLoading || teamLoading) {
      return <LoadingIndicator />
    } else if (events && events.length && teams && teams.length) {
      const teamList: Item[] = [];
      teams.forEach((team) => {
        const { name: teamName, questions } = team || { name: '', questions: [] };
        questions.forEach((questionId, index) => {
          const question = questionMap[questionId];
          if (question) {
            const { details: detailsText, question: questionText } = question;
            teamList.concat({
              teamName: teamName,
              questionNumber: index,
              detailsText: detailsText,
              questionText: questionText
            });
          }
        });
      });
      return (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
                <Table.HeaderCell>Question</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {teamList.sort().map((team, index) => {
                const { teamName, questionNumber, detailsText, questionText } = team;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{teamName}</Table.Cell>
                    <Table.Cell>{questionNumber}</Table.Cell>
                    <Table.Cell>{detailsText}</Table.Cell>
                    <Table.Cell>{questionText}</Table.Cell>
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

export { StatsSummary as StatsSummaryContainer };
