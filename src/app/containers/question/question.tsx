import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode, SFC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import * as _ from 'lodash';

import { GenericPage, NotificationPage, LoadingPage } from '../../components';
import { EventState, Question, QuestionState, RootState, TeamState } from "../../models";
import { findEvents, getTeam, getQuestion } from '../../state/actions';

import './question.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectQuestionId?: string;
  formQuestionAnswer: string;
  formSubmitted: boolean;
  correctAnswer: boolean;
  formWarning: boolean;
  formError: boolean;
  formMessage?: string;
}

interface ComponentDispatchProps {
  getQuestion: (id: string) => Promise<any>;
  findEvents: (id: string) => Promise<any>;
  getTeam: (id: string) => Promise<any>;
  push: (location: string) => RouterAction;
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

class QuestionContainer extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { eventId, questionId } = this.props.match.params;
    const { eventState, teamState, questionState } = this.props;

    if (eventId && (!eventState || !eventState.events || !eventState.events.length)) {
      this.props.findEvents(eventId);
    }

    if (eventId && (!teamState || !teamState.teams || !teamState.teams.lastIndexOf)) {
      this.props.getTeam(eventId);
    }

    if (questionId && (!questionState || !questionState.question)) {
      this.props.getQuestion(questionId);
    }
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {
    const { eventId, questionId } = this.props.match.params;
    const { question: selectedQuestion, loading: questionLoading } = this.props.questionState;
    const { shouldRedirect, redirectQuestionId } = this.state

    if (shouldRedirect) {
      const path = `/event/${eventId}/question/${redirectQuestionId}`;
      return <Redirect to={path} />
    } else {
      if (questionId) {
        if (questionLoading) {
          return <LoadingPage />
        } else {
          if (selectedQuestion) {
            return (
              <GenericPage>
                <this.QuestionFragment selectedQuestion={selectedQuestion} />
              </GenericPage>
            );
          } else {
            return <NotificationPage error message='No question found for id' />
          }
        }
      } else {
        return <NotificationPage error message='No question id selected' />
      }
    }
  }

  private QuestionFragment: SFC<{ selectedQuestion: Question }> = (props) => {
    const { details, question } = props.selectedQuestion;
    const { correctAnswer, formQuestionAnswer, formSubmitted, formWarning, formError, formMessage } = this.state

    if (correctAnswer) {
      return (
        <div>
          <Message info><Icon name='thumbs up' /> Correct!</Message>
          <p>
            <Button primary onClick={() => this.handleClick(props.selectedQuestion)}>
              Next question! <Icon name="arrow right" />
            </Button>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h3>{details}</h3>
          <h4>{question}</h4>
          <Form onSubmit={() => this.handleSubmit(props.selectedQuestion)} warning={formWarning} error={formError}>
            <Form.Group>
              <Form.Input placeholder='Enter answer...' value={formQuestionAnswer} onChange={this.handleChange} error={formError} />
              <Form.Button primary loading={formSubmitted}>
                Answer {'\u00A0'}<Icon name="check" />
              </Form.Button>
            </Form.Group>
            <Message error><Icon name='ban' /> {formMessage}</Message>
            <Message warning><Icon name='thumbs down' /> {formMessage}</Message>
          </Form>
        </div>
      );
    }
  }

  private handleClick = (selectedQuestion: Question) => {
    const { id } = selectedQuestion;
    const { teamState } = this.props;
    const { questions } = teamState.teams[0];

    const index = questions.indexOf(id);
    if (index + 1 < questions.length) {
      const nextId = questions[index + 1];
      const newState = { shouldRedirect: true, redirectQuestionId: nextId }
      this.setState(newState);
    } else {
      console.log('Oh no, index: ' + index);
    }
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const newState = { formQuestionAnswer: value, formError: false, formSubmitted: false }
    this.setState(newState);
  }

  private handleSubmit = (selectedQuestion: Question) => {
    const { formQuestionAnswer } = this.state;
    const { answerId, answers } = selectedQuestion;

    if (formQuestionAnswer) {
      const newState = { formSubmitted: true, formError: false }
      this.setState(newState);
      const correctAnswer = answers.find(answer => answer.id == answerId);
      const sanitizedSuppliedAnswer = _.toLower(_.trim(formQuestionAnswer));
      const sanitizedCorrectAnswer = _.toLower(_.trim(correctAnswer && correctAnswer.answer));
      if (sanitizedSuppliedAnswer === sanitizedCorrectAnswer) {
        const newState = { formSubmitted: false, formWarning: false, formError: false, correctAnswer: true }
        this.setState(newState);
      } else {
        this.setFormWarning('You answer is incorrect, try again');
      }
    } else {
      this.setFormError('No answer supplied');
    }
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
  push: (location: string) => dispatch(push(location))
});

const QuestionContainerConnected = connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);

export { QuestionContainerConnected };
