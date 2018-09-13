import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Button, Container, Icon, Message, Segment } from 'semantic-ui-react'

import { HeaderComponent } from '../../components/header';
import { Event, EventState, RootState, Team, TeamState } from "../../models";
import { findEvents, getTeam } from '../../state/actions';

import './event.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectQuestionId?: string;
  selectedEvent?: Event;
  selectedTeam?: Team;
}

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
  push: (location: string) => RouterAction;
}

interface ComponentStateProps {
  events: EventState;
  teams: TeamState;
  match?: any;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  shouldRedirect: false
}

class EventContainer extends Component<ComponentProps, ComponentState> {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.findEvents(id);
      this.props.getTeam(id);
    }
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {
    const { id } = this.props.match.params;
    const { shouldRedirect, redirectQuestionId, selectedEvent, selectedTeam } = this.state
    const { events, loading: eventsLoading } = this.props.events;
    const { teams, loading: teamsLoading } = this.props.teams;

    if (shouldRedirect) {
      const path = `/question/${redirectQuestionId}`;
      return <Redirect to={path} />
    } else {
      if (id) {
        if (selectedEvent && selectedTeam) {
          return (
            <ContainerFragment>
              <this.EventFragment event={selectedEvent} team={selectedTeam} />
            </ContainerFragment>
          );
        } else if (eventsLoading || teamsLoading) {
          return (
            <ContainerFragment>
              <LoadingFragment />
            </ContainerFragment>
          );
        } else {
          if (events && events.length > 0 && teams && teams.length > 0) {
            const newState = { selectedEvent: events[0], selectedTeam: teams[0] }
            this.setState(newState);
            return (
              <ContainerFragment>
                <LoadingFragment />
              </ContainerFragment>
            );
          } else {
            return (
              <ContainerFragment>
                <NoEventFoundFragment />
              </ContainerFragment>
            );
          }
        }
      } else {
        return (
          <ContainerFragment>
            <NoEventSelectedFragment />
          </ContainerFragment>
        );
      }
    }
  }

  private EventFragment: SFC<{ event: Event, team: Team }> = (props) => {
    const { event, team } = props;
    return (
      <div>
        <h3>Welcome to {event.name}</h3>
        <h4>Your are team {team.name}</h4>
        <p>
          <Button id={team.questions[0]} onClick={() => this.handleClick(team)}>
            Start rebuz! <Icon name="arrow right" />
          </Button>
        </p>
      </div>
    );
  }

  private handleClick = (team: Team) => {
    const newState = { shouldRedirect: true, redirectQuestionId: team.questions[0] }
    this.setState(newState);
  }
}

const ContainerFragment: SFC<{}> = (props) => {
  const { children } = props;
  return (
    <Container>
      <HeaderComponent />
      <Segment vertical>{children}</Segment>
    </Container>
  );
}

const LoadingFragment: SFC = () => {
  return <h3>Loading</h3>;
}

const NoEventFoundFragment: SFC = () => {
  return <Message warning>No event found for id.<br /><Link to='/'><Icon name='home' />Go to home page</Link></Message>;
}

const NoEventSelectedFragment: SFC = () => {
  return <Message warning>No event id selected.<br /><Link to='/'><Icon name='home' />Go to home page</Link></Message>;
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  events: state.events,
  teams: state.teams
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  getTeam: (id: string) => dispatch(getTeam(id)),
  push: (location: string) => dispatch(push(location))
});

const EventContainerConnected = connect(mapStateToProps, mapDispatchToProps)(EventContainer);

export { EventContainerConnected };
