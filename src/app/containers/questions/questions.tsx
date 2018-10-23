import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { CheckboxProps } from 'semantic-ui-react'
import * as _ from 'lodash';

import { NotificationMessage, LoadingIndicator } from '../../components';
import { EventState, QuestionState, QuestionType, RootState, Team, TeamState, StatsSave, Status } from "../../models";
import { getQuestion, saveStats } from '../../state/actions';
import { QuestionsForm } from './questions-form';
import { QuestionsSuccess } from './questions-success';

import './questions.css';
import { Redirect } from 'react-router';

interface ComponentState {
  currentQuestionId?: string;
  completeEvent: boolean;
  formQuestionAnswer: string;
  formSubmit: boolean;
  formWarning: boolean;
  formError: boolean;
  formMessage?: string;
}

interface ComponentDispatchProps {
  getQuestion: (id: string) => Promise<any>;
  saveStats: (statsSave: StatsSave) => Promise<any>;
}

interface ComponentStateProps {
  match?: any;
  history?: any;
  eventState: EventState;
  teamState: TeamState;
  questionState: QuestionState;
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const initialState: ComponentState = {
  completeEvent: false,
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
    const { currentQuestionId, completeEvent, formSubmit, formQuestionAnswer, formWarning, formError, formMessage } = this.state
    const { match, questionState, teamState } = this.props;
    const { eventId } = match.params;
    const { question, loading } = questionState;
    const { teamMap } = teamState;
    const team = teamMap[eventId];

    if (!currentQuestionId) {
      return <NotificationMessage error message='No question id selected' />
    } else if (loading) {
      return <LoadingIndicator />
    } else if (!question) {
      return <NotificationMessage error message={`No question found for id "${currentQuestionId}"`} />
    } else if (completeEvent) {
      const path = `/event/${eventId}/success`;
      return <Redirect to={path} />
    } else if (formSubmit && this.isCorrectAnswer()) {
      return (
        <QuestionsSuccess
          question={question}
          onClick={() => this.handleClick(eventId, team)} />
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
          onInputChange={this.onInputChange}
          onRadioChange={this.onRadioChange}
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
      const { type, answerId, answers } = question;

      switch (type) {
        case QuestionType.NORMAL: {
          const correctAnswer = answers.find(answer => answer.id == answerId);
          const sanitizedSuppliedAnswer = _.toLower(_.trim(formQuestionAnswer));
          const sanitizedCorrectAnswer = _.toLower(_.trim(correctAnswer && correctAnswer.answer));
          return sanitizedSuppliedAnswer === sanitizedCorrectAnswer;
        }
        case QuestionType.ALTERNATIVES: {
          const sanitizedSuppliedAnswer = _.toLower(_.trim(formQuestionAnswer));
          const sanitizedCorrectAnswer = _.toLower(_.trim(answerId));
          return sanitizedSuppliedAnswer === sanitizedCorrectAnswer;
        }
        default: {
          return false;
        }
      }
    }
  }

  private handleClick = (currentEventId: string, team: Team) => {
    const { currentQuestionId } = this.state;
    const { history } = this.props;

    if (currentQuestionId && team) {
      const { questions } = team;

      const index = questions.indexOf(currentQuestionId);
      const nextIndex = index + 1;
      if (nextIndex < questions.length) {
        const nextId = questions[nextIndex];
        const path = `/event/${currentEventId}/question/${nextId}`;
        history.push(path);
        const newState = { ...initialState, currentQuestionId: nextId }
        this.setState(newState);
      } else {
        const newState = { ...initialState, completeEvent: true }
        this.setState(newState);
      }
    }
  }

  private onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: answer } = event.currentTarget;
    const newState = { formQuestionAnswer: answer, formWarning: false, formError: false }
    this.setState(newState);
  }

  private onRadioChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const { value } = data;
    const answer = "" + value;
    const newState = { formQuestionAnswer: answer, formWarning: false, formError: false }
    this.setState(newState);
  }

  private handleSubmit = () => {
    const { formQuestionAnswer } = this.state;

    if (!formQuestionAnswer) {
      this.setFormError('No answer supplied');
    } else if (this.isCorrectAnswer()) {
      this.sendStats(Status.CORRECT);
      this.setFormSuccess();
    } else {
      this.sendStats(Status.INCORRECT);
      this.setFormWarning('Your answer is incorrect, try again');
    }
  }

  private sendStats = (status: Status) => {
    const { currentQuestionId } = this.state;
    const { match, eventState } = this.props;
    const { eventId: teamId } = match.params;
    const { events } = eventState;
    const event = events[0];
    const { id: eventId } = event;

    if (currentQuestionId) {
      const statsSave: StatsSave = {
        event: eventId,
        team: teamId,
        question: currentQuestionId,
        status: status
      }
      this.props.saveStats(statsSave);
    }
  }

  private setFormSuccess = () => {
    const newState = { formSubmit: true, formWarning: false, formError: false, formMessage: undefined }
    this.setState(newState);
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
  eventState: state.events,
  teamState: state.teams,
  questionState: state.question
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  getQuestion: (id: string) => dispatch(getQuestion(id)),
  saveStats: (statsSave: StatsSave) => dispatch(saveStats(statsSave))
});

const QuestionsContainer = connect(mapStateToProps, mapDispatchToProps)(Questions);

export { QuestionsContainer };
