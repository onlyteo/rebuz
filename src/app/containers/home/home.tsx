import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { Container, Form, Header, Icon, Segment } from 'semantic-ui-react'

import './home.css';

interface ComponentState {
  formId: string;
  formSubmitted: boolean;
}

class HomeContainer extends Component<{}, ComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      formId: '',
      formSubmitted: false
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {

    const { formId, formSubmitted } = this.state

    return (
      <Container>
        <Header as='h1'>
          <Icon name='map' />Rebuz
        </Header>
        <Segment vertical>
          <Form loading={formSubmitted} onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input name="id" value={formId} placeholder='Enter event id...' onChange={this.handleChange} />
              <Form.Button icon color='blue'>
                <Icon name='arrow right' />
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </Container>
    );
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    console.log('change');
    console.log(value);
    this.setState({ formId: value });
  }

  private handleSubmit = () => {
    const { formId } = this.state
    console.log('submit');
    console.log(formId);
    this.setState({ formSubmitted: true });
  }
}

export { HomeContainer };
