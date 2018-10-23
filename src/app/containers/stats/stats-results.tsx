import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonProps, Icon, ModalProps, Table } from 'semantic-ui-react'

import { findStats, removeStats } from '../../state/actions';
import { RootState, EventState, StatsState, TeamState } from "../../models";
import { defaultLink, ConfirmModal, LoadingIndicator, NotificationMessage, LinkProps } from '../../components';

import './stats.css';

interface ComponentState {
  openModal: boolean;
}

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

const initialState: ComponentState = {
  openModal: false
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps & ComponentLocalProps;

class StatsResults extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

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
      const { openModal } = this.state;
      const statList = stats.map((stat) => {
        const { team: teamId, question: questionId, tries, status, created, modified } = stat;
        const team = teamMap[teamId];
        const { name: teamName, questions } = team || { name: '', questions: [] };
        const questionNumber = questions.indexOf(questionId) + 1;
        const createdTimeString = timestampToString(created);
        const modifiedTimeString = timestampToString(modified);
        return {
          teamId: teamId,
          teamName: teamName,
          questionId: questionId,
          questionNumber: questionNumber,
          numberOfTries: tries,
          questionStatus: status,
          createdTime: createdTimeString,
          modifiedTime: modifiedTimeString
        };
      });
      return (
        <div>
          <ConfirmModal
            title='Delete stats'
            subtitle='This action can not be reversed'
            open={openModal}
            onClose={this.onModalClose}
            onClick={this.onModalCloseButtonClick} />
          <Button primary onClick={this.onModalOpenButtonClick}>
            Delete stats <Icon name="delete" />
          </Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Tries</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Modified</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {statList.sort().map((stat, index) => {
                const { teamId, teamName, questionId, questionNumber, numberOfTries, questionStatus, createdTime, modifiedTime } = stat;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {teamName} <span className='low-key-text'>({teamId})</span>
                    </Table.Cell>
                    <Table.Cell>
                      {questionNumber} <span className='low-key-text'>({questionId})</span>
                    </Table.Cell>
                    <Table.Cell>{numberOfTries}</Table.Cell>
                    <Table.Cell>{questionStatus}</Table.Cell>
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
      return <NotificationMessage warning link={backLink} message={`No stats found for event id "${eventId}"`} />
    }
  }

  private onModalOpenButtonClick = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    const newState = { openModal: true }
    this.setState(newState);
  }

  private onModalCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    const { eventId } = this.props;
    const { positive } = data;
    if (positive) {
      this.props.removeStats(eventId);
      this.props.findStats(eventId);
    }
    const newState = { openModal: false }
    this.setState(newState);
  }

  private onModalClose = (event: React.MouseEvent<HTMLElement>, data: ModalProps) => {
    const newState = { openModal: false }
    this.setState(newState);
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
