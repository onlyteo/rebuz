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
  findEvents: (code: string) => Promise<any>;
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
    const { code } = this.props.match.params
    this.props.findEvents(code);
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {

    return (
      <Container>
        <Header as='h1'>
          <Icon name='map' />Rebuz - Event
        </Header>
        <Segment vertical>
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
  findEvents: (code: string) => dispatch(findEvents(code)),
  push: (location: string) => dispatch(push(location))
});

const EventContainerConnected = connect(mapStateToProps, mapDispatchToProps)(EventContainer);

export { EventContainerConnected };
