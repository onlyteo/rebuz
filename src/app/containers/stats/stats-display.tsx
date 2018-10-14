import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react'

import { RootState, EventState, QuestionState, StatsState, TeamState } from "../../models";
import { findStats, getEvent, getTeam, getQuestion } from '../../state/actions';
import { StatsResultsContainer } from './stats-results';
import { StatsSummaryContainer } from './stats-summary';

import './stats.css';

interface ComponentDispatchProps {
  getEvent: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
  getQuestion: (id: string) => Promise<any>;
  findStats: (eventId: string) => Promise<any>;
}

interface ComponentStateProps {
  match?: any;
  eventState: EventState;
  teamState: TeamState;
  questionState: QuestionState;
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
    const { eventState, teamState, /*questionState*/ } = this.props;
    const { loading: eventsLoading, eventMap } = eventState;
    const { loading: teamsLoading, /*teams,*/ teamMap } = teamState;
    //const { loading: questionLoading, questionMap } = questionState;

    if (eventId && !eventsLoading && eventMap && eventMap[eventId]) {
      const event = eventMap[eventId];
      if (event) {
        event.teams.forEach(teamId => {
          if (!teamsLoading && !teamMap[teamId]) {
            this.props.getTeam(teamId);
          }
        });
      }
    }

    // if (!teamsLoading && teams && teams.length) {
    //   teams.forEach(team => {
    //     const { questions } = team;
    //     questions.forEach(questionId => {
    //       if (!questionLoading && !questionMap[questionId]) {
    //         this.props.getQuestion(questionId);
    //       }
    //     });
    //   });
    // }
  }

  public render(): ReactNode {
    const { eventId } = this.props.match.params;
    const { eventState, teamState, statsState, questionState } = this.props;
    const { eventMap } = eventState;
    const event = eventMap[eventId];
    const { welcomeMessage: title } = event || { welcomeMessage: '' };
    const panes = [
      {
        menuItem: 'Results',
        render: () => (
          <Tab.Pane>
            <StatsResultsContainer
              eventId={eventId}
              eventState={eventState}
              teamState={teamState}
              statsState={statsState} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Summary',
        render: () => (
          <Tab.Pane>
            <StatsSummaryContainer
              eventId={eventId}
              eventState={eventState}
              teamState={teamState}
              statsState={statsState}
              questionState={questionState} />
          </Tab.Pane>)
      }
    ]
    return (
      <div>
        <h3>{title}</h3>
        <Tab panes={panes} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams,
  questionState: state.question,
  statsState: state.stats
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  getEvent: (id: string) => dispatch(getEvent(id)),
  getTeam: (id: string) => dispatch(getTeam(id)),
  getQuestion: (id: string) => dispatch(getQuestion(id)),
  findStats: (eventId: string) => dispatch(findStats(eventId)),
});

const StatsDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(StatsDisplay);

export { StatsDisplayContainer };
