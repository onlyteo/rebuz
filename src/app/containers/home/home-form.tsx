import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Form, FormProps, Icon, InputOnChangeData, Message } from 'semantic-ui-react'

import './home.css';

interface ComponentProps {
  formEventId: string;
  formError: boolean;
  formErrorMessage?: string;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void;
}

class HomeForm extends Component<ComponentProps> {

  public render(): ReactNode {
    const { formEventId, formError, formErrorMessage, onChange, onSubmit } = this.props;

    return (
      <Form onSubmit={onSubmit} error={formError}>
        <Form.Group>
          <Form.Input placeholder='Enter rebuz id...' value={formEventId} onChange={onChange} error={formError} />
          <Form.Button primary>
            Find rebuz <Icon name="arrow right" />
          </Form.Button>
        </Form.Group>
        <Message error><Icon name='ban' /> {formErrorMessage}</Message>
      </Form>
    );
  }
}

export { HomeForm };
