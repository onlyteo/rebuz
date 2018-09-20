import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Button, Icon, Message } from 'semantic-ui-react'
import * as _ from 'lodash';

import { NotificationMessage, LoadingIndicator } from '../../components';
import { Event, EventState, Question, QuestionState, RootState, Team, TeamState } from "../../models";
import { findEvents, getTeam, getQuestion } from '../../state/actions';
import { QuestionsForm } from './questions-form';

import './questions.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectQuestionId?: string;
  formQuestionAnswer: string;
  formSubmitted: boolean;
  correctAnswer: boolean;
  formWarning: boolean;
  formError: boolean;
  formMessage?: string;
  selectedEvent?: Event;
  selectedTeam?: Team;
  selectedQuestion?: Question;
}

interface ComponentDispatchProps {
  getQuestion: (id: string) => Promise<any>;
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
}

interface ComponentStateProps {
  eventState: EventState;
  teamState: TeamState;
  questionState: QuestionState;
  match?: any;
}

const initialState: ComponentState = {
  formQuestionAnswer: '',
  shouldRedirect: false,
  formSubmitted: false,
  correctAnswer: false,
  formWarning: false,
  formError: false,
}

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class Questions extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
    console.log('Did construct');
  }

  componentDidMount() {
    console.log('Did mount');
    const { eventId, questionId } = this.props.match.params;

    if (this.shouldFindEvents(eventId)) {
      this.props.findEvents(eventId);
    }

    if (this.shouldGetTeam(eventId)) {
      this.props.getTeam(eventId);
    }

    if (this.shouldGetQuestion(questionId)) {
      this.props.getQuestion(questionId);
    }
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    console.log('Did update');
    const { eventId, questionId } = this.props.match.params;
    const { eventState, teamState, questionState } = this.props;
    const { selectedEvent, selectedTeam, selectedQuestion } = this.state;

    if (eventId && eventState && !selectedEvent) {
      const { events, loading } = eventState;

      if (!loading && events && events.length > 0) {
        const newState = { selectedEvent: events[0] }
        this.setState(newState);
      }
    }

    if (eventId && teamState && !selectedTeam) {
      const { teams, loading } = teamState;

      if (!loading && teams && teams.length > 0) {
        const newState = { selectedTeam: teams[0] }
        this.setState(newState);
      }
    }

    if (questionId && questionState && (!selectedQuestion || selectedQuestion.id !== questionId)) {
      const { question, loading } = questionState;

      if (!loading && question) {
        const newState = { selectedQuestion: question }
        this.setState(newState);
      }
    }
  }

  public render(): ReactNode {
    const { eventId, questionId } = this.props.match.params;
    const { question: selectedQuestion, loading: questionLoading } = this.props.questionState;
    const { correctAnswer, shouldRedirect, redirectQuestionId, formQuestionAnswer, formWarning, formError, formMessage } = this.state
    console.log(this.state);
    if (shouldRedirect) {
      console.log('Should redirect');
      const path = `/event/${eventId}/question/${redirectQuestionId}`;
      return <Redirect push to={path} />
    } else if (questionId) {
      if (questionLoading) {
        console.log('Loading');
        return <LoadingIndicator />
      } else {
        if (selectedQuestion && correctAnswer) {
          console.log('Correct answer');
          return (
            <div>
              <Message info><Icon name='thumbs up' /> Correct!</Message>
              <p>
                <Button primary onClick={() => this.handleClick(selectedQuestion)}>
                  Next question! <Icon name="arrow right" />
                </Button>
              </p>
            </div>
          );
        } else if (selectedQuestion && !correctAnswer) {
          console.log('Should answer');
          return (
            <QuestionsForm
              question={selectedQuestion}
              formAnswer={formQuestionAnswer}
              formWarning={formWarning}
              formError={formError}
              formErrorMessage={formMessage}
              formWarningMessage={formMessage}
              onChange={this.handleChange}
              onSubmit={() => this.handleSubmit(selectedQuestion)} />
          );
        } else {
          console.log('No question found');
          return <NotificationMessage error message='No question found for id' />
        }
      }
    } else {
      console.log('No question id');
      return <NotificationMessage error message='No question id selected' />
    }
  }

  private handleClick = (selectedQuestion: Question) => {
    const { id } = selectedQuestion;
    const { selectedTeam } = this.state;

    if (selectedTeam) {
      const { questions } = selectedTeam;

      const index = questions.indexOf(id);
      const nextIndex = index + 1;
      if (nextIndex < questions.length) {
        console.log('Next index' + nextIndex);
        const nextId = questions[nextIndex];
        const newState = { shouldRedirect: true, redirectQuestionId: nextId, correctAnswer: false }
        this.setState(newState);
      } else {
        console.log('Oh no, next index: ' + nextIndex);
      }
    } else {
      console.log('Oh no, missing team');
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const newState = { formQuestionAnswer: value, formError: false, formSubmitted: false }
    this.setState(newState);
  }

  private handleSubmit = (selectedQuestion: Question) => {
    const { formQuestionAnswer } = this.state;

    if (formQuestionAnswer) {
      const newState = { formSubmitted: true, formError: false }
      this.setState(newState);
      if (this.isCorrectAnswer(selectedQuestion)) {
        const newState = { formSubmitted: false, formWarning: false, formError: false, correctAnswer: true }
        this.setState(newState);
      } else {
        this.setFormWarning('You answer is incorrect, try again');
      }
    } else {
      this.setFormError('No answer supplied');
    }
  }

  private shouldFindEvents = (eventId: string): boolean => {
    const { eventState } = this.props;
    return !_.isEmpty(eventId) && (!eventState || !eventState.events || !eventState.events.length);
  }

  private shouldGetTeam = (eventId: string): boolean => {
    const { teamState } = this.props;
    return !_.isEmpty(eventId) && (!teamState || !teamState.teams || !teamState.teams.length);
  }

  private shouldGetQuestion = (questionId: string): boolean => {
    const { questionState } = this.props;
    return !_.isEmpty(questionId) && (!questionState || !questionState.question || questionState.question.id !== questionId);
  }

  private isCorrectAnswer = (selectedQuestion: Question): boolean => {
    const { formQuestionAnswer } = this.state;
    const { answerId, answers } = selectedQuestion;

    const correctAnswer = answers.find(answer => answer.id == answerId);
    const sanitizedSuppliedAnswer = _.toLower(_.trim(formQuestionAnswer));
    const sanitizedCorrectAnswer = _.toLower(_.trim(correctAnswer && correctAnswer.answer));
    return sanitizedSuppliedAnswer === sanitizedCorrectAnswer;
  }

  private setFormWarning = (message: string) => {
    const newState = { formSubmitted: false, formWarning: true, formError: false, formMessage: message }
    this.setState(newState);
  }

  private setFormError = (message: string) => {
    const newState = { formSubmitted: false, formWarning: false, formError: true, formMessage: message }
    this.setState(newState);
  }
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  eventState: state.events,
  teamState: state.teams,
  questionState: state.question
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  findEvents: (id: string) => dispatch(findEvents(id)),
  getTeam: (id: string) => dispatch(getTeam(id)),
  getQuestion: (id: string) => dispatch(getQuestion(id)),
});

const QuestionsContainer = connect(mapStateToProps, mapDispatchToProps)(Questions);

export { QuestionsContainer };
