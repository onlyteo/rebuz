import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Container, Icon, Message, Segment } from 'semantic-ui-react'

import { HeaderComponent } from '../../components/header';
import { Event, EventState, RootState, Team, TeamState } from "../../models";
import { findEvents, getTeam } from '../../state/actions';

import './event.css';

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

class EventContainer extends Component<ComponentProps> {

  componentDidMount() {
    console.log('did mount');
    const { id } = this.props.match.params;
    if (id) {
      this.props.findEvents(id);
      this.props.getTeam(id);
    }
  }

  componentDidUpdate() {
    console.log('did update');
  }

  public render(): ReactNode {
    const { id } = this.props.match.params;
    const { events, loading: eventsLoading } = this.props.events;
    const { teams, loading: teamsLoading } = this.props.teams;

    if (id) {
      if (eventsLoading || teamsLoading) {
        return (
          <ContainerFragment>
            <LoadingFragment />
          </ContainerFragment>
        );
      } else {
        if (events && events.length > 0 && teams && teams.length > 0) {
          const event = events[0];
          const team = teams[0];
          return (
            <ContainerFragment>
              <EventFragment event={event} team={team} />
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

const EventFragment: SFC<{ event: Event, team: Team }> = (props) => {
  const { event, team } = props;
  return (
    <div>
      <h3>Welcome to {event.name}</h3>
      <h4>Your are team {team.name}</h4>
    </div>
  );
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
