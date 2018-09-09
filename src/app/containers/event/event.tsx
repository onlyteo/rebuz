import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { push, RouterAction } from 'react-router-redux';
import { Container, Header, Icon, Segment } from 'semantic-ui-react'

import { EventResponse } from "../../models";
import { RootState } from '../../state/types';
import { findEvents } from '../../state/actions';

import './event.css';

interface ComponentDispatchProps {
  findEvents: (id: string) => Promise<any>;
  push: (location: string) => RouterAction;
}

interface ComponentStateProps {
  events?: EventResponse[];
  loading: boolean;
  error: any;
  match?: any;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class EventContainer extends Component<ComponentProps> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.findEvents(id);
    }
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {
    const { id } = this.props.match.params;
    const { events, loading } = this.props;
    let content;

    if (id) {
      if (loading) {
        content = <h3>Loading</h3>;
      } else {
        content = <h3>Event: {events && events.length && events[0].name}</h3>;
      }
    } else {
      content = <h3>No event code selected</h3>;
    }

    return (
      <Container>
        <Header as='h1'>
          <Icon name='map' />Rebuz - Event
        </Header>
        <Segment vertical>
          {content}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  events: state.events.events,
  loading: state.events.loading,
  error: null
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  push: (location: string) => dispatch(push(location))
});

const EventContainerConnected = connect(mapStateToProps, mapDispatchToProps)(EventContainer);

export { EventContainerConnected };
