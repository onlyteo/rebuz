import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { RootState, EventState, StatsState, TeamState } from "../../models";
import { findEvents, findStats, getTeam } from '../../state/actions';
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
  findEvents: (id: string) => Promise<any>;
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
    const { formSubmitted, formError } = this.state;
    const { eventState } = this.props;
    const { loading, events } = eventState;

    if (formSubmitted && !formError && eventState && !loading && events && events.length) {
      const event = eventState.events[0];
      event.teams.forEach(team => {
        this.props.getTeam(team);
      });
    }
  }

  public render(): ReactNode {
    const { formEventId, formSubmitted, formError, formErrorMessage } = this.state;
    const { eventState, statsState, teamState } = this.props;

    if (formSubmitted && !formError) {
      const { loading: eventsLoading } = eventState;
      const { loading: statsLoading, stats } = statsState;
      const { loading: teamLoading, teams } = teamState;
      if ((eventState && eventsLoading) || (statsState && statsLoading) || (teamState && teamLoading)) {
        return <LoadingIndicator />
      } else if (statsState && stats) {
        console.log('Stats: ' + stats.length);
        return (
          <ul>
            {stats.map((stat) => {
              const { team: teamId, question: questionId } = stat;
              const team = teams.find(team => team.id === teamId);
              return <li>{team ? team.name : 'Unknown'} - {questionId}</li>
            })}
          </ul>
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
      this.props.findEvents(formEventId);
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
  findEvents: (id: string) => dispatch(findEvents(id)),
  getTeam: (id: string) => dispatch(getTeam(id)),
  findStats: (eventId: string) => dispatch(findStats(eventId)),
});

const StatsContainer = connect(mapStateToProps, mapDispatchToProps)(Stats);

export { StatsContainer };
