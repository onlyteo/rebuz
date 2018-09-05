import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Button, Container, Header, Icon, Input, Segment } from 'semantic-ui-react'

import './home.css';

class Home extends Component {

  public render(): ReactNode {

    return (
      <Container>
        <Header as='h1'>
          <Icon name='map' />Rebuz
        </Header>
        <Segment vertical>
          <Input placeholder='Enter event code...' />
          <Button icon color='blue'>
            <Icon name='arrow right' />
          </Button>
        </Segment>
      </Container>
    );
  }
}

export default Home;
