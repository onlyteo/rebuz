import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Form, FormProps, Icon, InputOnChangeData, Message } from 'semantic-ui-react'

import { Question } from "../../models";

interface ComponentProps {
  question: Question;
  formAnswer: string;
  formWarning: boolean;
  formError: boolean;
  formWarningMessage?: string;
  formErrorMessage?: string;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void;
}

class QuestionsForm extends Component<ComponentProps> {

  public render(): ReactNode {
    const { question, formAnswer, formWarning, formError, formWarningMessage, formErrorMessage, onChange, onSubmit } = this.props;
    const { details: detailsText, question: questionText } = question;

    return (
      <div>
        <h3>{detailsText}</h3>
        <h4>{questionText}</h4>
        <Form onSubmit={onSubmit} warning={formWarning} error={formError}>
          <Form.Group>
            <Form.Input placeholder='Enter answer...' value={formAnswer} onChange={onChange} error={formError} />
            <Form.Button primary>
              Answer {'\u00A0'}<Icon name="check" />
            </Form.Button>
          </Form.Group>
          <Message error><Icon name='ban' /> {formErrorMessage}</Message>
          <Message warning><Icon name='thumbs down' /> {formWarningMessage}</Message>
        </Form>
      </div>
    );
  }
}

export { QuestionsForm };
