import * as React from 'react';
import { Component, ReactNode, SFC } from 'react';
import { CheckboxProps, Form, FormProps, Icon, InputOnChangeData, Message } from 'semantic-ui-react'

import { Question, QuestionType } from "../../models";
import { NotificationMessage } from '../../components';
import { QuestionsHeader } from "./questions-header";

interface ComponentProps {
  question: Question;
  formAnswer: string;
  formWarning: boolean;
  formError: boolean;
  formWarningMessage?: string;
  formErrorMessage?: string;
  onInputChange: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  onRadioChange: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void;
}

class QuestionsForm extends Component<ComponentProps> {

  public render(): ReactNode {
    const { question, formAnswer, formWarning, formError, formWarningMessage, formErrorMessage, onInputChange, onRadioChange, onSubmit } = this.props;
    const { details: detailsText, question: questionText } = question;

    return (
      <div>
        <QuestionsHeader details={detailsText} question={questionText} />
        <Form onSubmit={onSubmit} warning={formWarning} error={formError}>
          <FormInput question={question} formAnswer={formAnswer} formError={formError} onInputChange={onInputChange} onRadioChange={onRadioChange} />
          <Message error><Icon name='ban' /> {formErrorMessage}</Message>
          <Message warning><Icon name='thumbs down' /> {formWarningMessage}</Message>
        </Form>
      </div>
    );
  }
}

interface FormInputProps {
  question: Question;
  formAnswer: string;
  formError: boolean;
  onInputChange: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  onRadioChange: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;
}

const FormInput: SFC<FormInputProps> = (props) => {
  const { question, formAnswer, formError } = props;
  const { type } = question;

  switch (type) {
    case QuestionType.NORMAL: {
      const { onInputChange } = props;
      return (
        <div>
          <Form.Group>
            <Form.Input placeholder='Enter answer...' value={formAnswer} onChange={onInputChange} error={formError} />
          </Form.Group>
          <FormButton />
        </div>
      );
    }
    case QuestionType.ALTERNATIVES: {
      const { onRadioChange } = props;
      return (
        <div>
          <FormRadios question={question} formAnswer={formAnswer} onChange={onRadioChange} />
          <FormButton />
        </div>
      );
    }
    case QuestionType.MULTIPLE_CHOICE: {
      return <NotificationMessage error message='Question type is not implemented' />
    }
    default: {
      return <NotificationMessage error message='Unknown question type' />
    }
  }
}

interface FormRadiosProps {
  question: Question;
  formAnswer: string;
  onChange: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;
}

const FormRadios: SFC<FormRadiosProps> = (props) => {
  const { question, formAnswer, onChange } = props;
  const { answers } = question;
  const radios = answers.map((answer, index) => {
    const { id, answer: answerText } = answer;
    const checked = id === formAnswer;
    return (
      <Form.Group key={index}>
        <Form.Radio key={index} label={answerText} value={id} checked={checked} onChange={onChange} onClick={onChange} />
      </Form.Group>
    );
  });
  return (
    <div>
      {radios}
    </div>
  );
}

const FormButton: SFC = () => {
  return (
    <Form.Group>
      <Form.Button primary>
        Answer {'\u00A0'}<Icon name="check" />
      </Form.Button>
    </Form.Group>
  );
}

export { QuestionsForm };
