import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Message } from 'semantic-ui-react'
import * as _ from 'lodash';

import { NotificationMessage, LoadingIndicator } from '../../components';
import { QuestionState, RootState, TeamState } from "../../models";
import { getQuestion } from '../../state/actions';
import { QuestionsForm } from './questions-form';

import './questions.css';

interface ComponentState {
  currentQuestionId?: string;
  formQuestionAnswer: string;
  formSubmit: boolean;
  formWarning: boolean;
  formError: boolean;
  formMessage?: string;
}

interface ComponentDispatchProps {
  getQuestion: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  match?: any;
  history?: any;
  teamState: TeamState;
  questionState: QuestionState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  formQuestionAnswer: '',
  formSubmit: false,
  formWarning: false,
  formError: false,
}

class Questions extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { questionId } = this.props.match.params;

    if (questionId) {
      const newState = { currentQuestionId: questionId }
      this.setState(newState);
    }
  }

  componentDidUpdate() {
    const { currentQuestionId } = this.state;
    const { questionState } = this.props;
    const { question, loading } = questionState;

    if (currentQuestionId && !loading && (!question || question.id !== currentQuestionId)) {
      this.props.getQuestion(currentQuestionId);
    }
  }

  public render(): ReactNode {
    const { currentQuestionId, formSubmit, formQuestionAnswer, formWarning, formError, formMessage } = this.state
    const { questionState } = this.props;
    const { question, loading } = questionState;

    if (!currentQuestionId) {
      return <NotificationMessage error message='No question id selected' />
    } else if (loading) {
      return <LoadingIndicator />
    } else if (!question) {
      return <NotificationMessage error message={`No question found for id "${currentQuestionId}"`} />
    } else if (formSubmit && this.isCorrectAnswer()) {
      return (
        <div>
          <Message info><Icon name='thumbs up' /> Correct!</Message>
          <p>
            <Button primary onClick={() => this.handleClick()}>
              Next question! <Icon name="arrow right" />
            </Button>
          </p>
        </div>
      );
    } else {
      return (
        <QuestionsForm
          question={question}
          formAnswer={formQuestionAnswer}
          formWarning={formWarning}
          formError={formError}
          formErrorMessage={formMessage}
          formWarningMessage={formMessage}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} />
      );
    }
  }

  private isCorrectAnswer = (): boolean => {
    const { formQuestionAnswer } = this.state;
    const { questionState } = this.props;
    const { question } = questionState;

    if (!question) {
      return false;
    } else {
      const { answerId, answers } = question;

      const correctAnswer = answers.find(answer => answer.id == answerId);
      const sanitizedSuppliedAnswer = _.toLower(_.trim(formQuestionAnswer));
      const sanitizedCorrectAnswer = _.toLower(_.trim(correctAnswer && correctAnswer.answer));
      return sanitizedSuppliedAnswer === sanitizedCorrectAnswer;
    }
  }

  private handleClick = () => {
    const { currentQuestionId } = this.state;
    const { history, teamState } = this.props;
    const { teams } = teamState;

    if (currentQuestionId && teams && teams.length == 1) {
      const team = teams[0];
      const { questions } = team;

      const index = questions.indexOf(currentQuestionId);
      const nextIndex = index + 1;
      if (nextIndex < questions.length) {
        console.log('Next index' + nextIndex);
        const { eventId } = this.props.match.params;
        const nextId = questions[nextIndex];
        const newState = { currentQuestionId: nextId, formQuestionAnswer: '', formWarning: false, formError: false }
        this.setState(newState);
        const path = `/event/${eventId}/question/${nextId}`;
        history.push(path);
      } else {
        console.log('Oh no, next index: ' + nextIndex);
      }
    } else {
      console.log('Oh no, missing team');
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const newState = { formQuestionAnswer: value, formError: false }
    this.setState(newState);
  }

  private handleSubmit = () => {
    const { formQuestionAnswer } = this.state;

    if (!formQuestionAnswer) {
      this.setFormError('No answer supplied');
    } else if (this.isCorrectAnswer()) {
      const newState = { formSubmit: true, formWarning: false, formError: false }
      this.setState(newState);
    } else {
      this.setFormWarning('You answer is incorrect, try again');
    }
  }

  private setFormWarning = (message: string) => {
    const newState = { formSubmit: false, formWarning: true, formError: false, formMessage: message }
    this.setState(newState);
  }

  private setFormError = (message: string) => {
    const newState = { formSubmit: false, formWarning: false, formError: true, formMessage: message }
    this.setState(newState);
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  teamState: state.teams,
  questionState: state.question
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  getQuestion: (id: string) => dispatch(getQuestion(id))
});

const QuestionsContainer = connect(mapStateToProps, mapDispatchToProps)(Questions);

export { QuestionsContainer };
