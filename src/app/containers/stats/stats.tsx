import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { RootState, EventState, StatsState, TeamState } from "../../models";
import { findStats, getEvent, getTeam } from '../../state/actions';
import { LoadingIndicator, NotificationMessage } from '../../components';
import { StatsForm } from './stats-form'

import './stats.css';

interface ComponentState {
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formErrorMessage?: string;
}

interface ComponentDispatchProps {
  getEvent: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
  findStats: (eventId: string) => Promise<any>;
}

interface ComponentStateProps {
  eventState: EventState;
  teamState: TeamState;
  statsState: StatsState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  formSubmitted: false,
  formError: false,
  formEventId: ''
}

class Stats extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate() {
    const { formEventId, formSubmitted, formError } = this.state;
    const { eventState, teamState } = this.props;
    const { loading: eventsLoading, eventMap } = eventState;
    const { loading: teamsLoading, teamMap } = teamState;

    if (formSubmitted && !formError && !eventsLoading && eventMap && eventMap[formEventId]) {
      const event = eventMap[formEventId];
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
    const { formEventId, formSubmitted, formError, formErrorMessage } = this.state;
    const { eventState, statsState, teamState } = this.props;

    if (formSubmitted && !formError) {
      const { loading: eventsLoading, eventMap } = eventState;
      const { loading: statsLoading, stats } = statsState;
      const { loading: teamLoading, teamMap } = teamState;
      if ((eventState && eventsLoading) || (statsState && statsLoading) || (teamState && teamLoading)) {
        return <LoadingIndicator />
      } else if (statsState && stats) {
        const event = eventMap[formEventId];
        const { welcomeMessage } = event;
        return (
          <div>
            <h3>{welcomeMessage}</h3>
            <table className='bordered'>
              <thead>
                <tr>
                  <th className='cell bordered'>Team</th>
                  <th className='cell bordered'>Question</th>
                  <th className='cell bordered'>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => {
                  const { team: teamId, question: questionId, modified } = stat;
                  const team = teamMap[teamId];
                  const { name, questions } = team;
                  const questionNumber = questions.indexOf(questionId) + 1;
                  const modifiedTime = new Date(modified);
                  const modifiedTimeString = modifiedTime.toLocaleString('nb-NO');
                  return (
                    <tr key={index}>
                      <td className='cell bordered'>{name ? name : 'Unknown'}</td>
                      <td className='cell bordered'>{questionNumber}</td>
                      <td className='cell bordered'>{modifiedTimeString}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        );
      } else {
        return <NotificationMessage error withLink message={`No stats found for event id "${formEventId}"`} />
      }
    } else {
      return (
        <StatsForm formEventId={formEventId} formError={formError} formErrorMessage={formErrorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
      );
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    this.setFormUpdatedState(value);
  }

  private handleSubmit = () => {
    const { formEventId } = this.state;

    if (formEventId && formEventId.length == 6) {
      this.props.getEvent(formEventId);
      this.props.findStats(formEventId);
      this.setFormSubmittedState();
    } else {
      this.setFormErrorState('Event id must be a six character code');
    }
  }

  private setFormSubmittedState = () => {
    const newState = { formSubmitted: true, formError: false, formErrorMessage: undefined }
    this.setState(newState);
  }

  private setFormUpdatedState = (formEventId: string) => {
    const newState = { formEventId: formEventId, formSubmitted: false, formError: false, formErrorMessage: undefined }
    this.setState(newState);
  }

  private setFormErrorState = (message: string) => {
    const newState = { formSubmitted: false, formError: true, formErrorMessage: message }
    this.setState(newState);
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

const StatsContainer = connect(mapStateToProps, mapDispatchToProps)(Stats);

export { StatsContainer };
