import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode, SFC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Container, Form, Icon, Message, Segment } from 'semantic-ui-react'
import * as _ from 'lodash';

import { HeaderComponent } from '../../components/header';
import { EventState, Question, QuestionState, RootState, TeamState } from "../../models";
import { getQuestion } from '../../state/actions';

import './question.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectQuestionId?: string;
  formQuestionAnswer: string;
  formSubmitted: boolean;
  formInputPlaceholder: string;
  formButtonIcon: string;
  correctAnswer: boolean;
  formWarning: boolean;
  formError: boolean;
  formMessage?: string;
}

interface ComponentDispatchProps {
  getQuestion: (id: string) => Promise<any>;
  push: (location: string) => RouterAction;
}

interface ComponentStateProps {
  events: EventState;
  teams: TeamState;
  question: QuestionState;
  match?: any;
}

const initialState: ComponentState = {
  formQuestionAnswer: '',
  shouldRedirect: false,
  formSubmitted: false,
  formInputPlaceholder: 'Enter answer...',
  formButtonIcon: 'arrow right',
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
    const { id } = this.props.match.params;
    if (id) {
      this.props.getQuestion(id);
    }
  }

  componentDidUpdate() {
  }

  public render(): ReactNode {
    const { id } = this.props.match.params;
    const { question: selectedQuestion, loading: questionLoading } = this.props.question;

    if (id) {
      if (questionLoading) {
        return (
          <ContainerFragment>
            <LoadingFragment />
          </ContainerFragment>
        );
      } else {
        if (selectedQuestion) {
          return (
            <ContainerFragment>
              <this.QuestionFragment selectedQuestion={selectedQuestion} />
            </ContainerFragment>
          );
        } else {
          return (
            <ContainerFragment>
              <NoQuestionFoundFragment />
            </ContainerFragment>
          );
        }
      }
    } else {
      return (
        <ContainerFragment>
          <NoQuestionSelectedFragment />
        </ContainerFragment>
      );
    }
  }

  private QuestionFragment: SFC<{ selectedQuestion: Question }> = (props) => {
    const { details, question } = props.selectedQuestion;
    const { correctAnswer, formQuestionAnswer, formSubmitted, formInputPlaceholder, formButtonIcon, formWarning, formError, formMessage } = this.state

    if (correctAnswer) {
      return (
        <Message info><Icon name='thumbs up' /> Correct!</Message>
      );
    } else {
      return (
        <div>
          <h3>{details}</h3>
          <h4>{question}</h4>
          <Form onSubmit={() => this.handleSubmit(props.selectedQuestion)} warning={formWarning} error={formError}>
            <Form.Group>
              <Form.Input placeholder={formInputPlaceholder} value={formQuestionAnswer} onChange={this.handleChange} error={formError} />
              <Form.Button primary icon={formButtonIcon} loading={formSubmitted} />
            </Form.Group>
            <Message error><Icon name='ban' /> {formMessage}</Message>
            <Message warning><Icon name='thumbs down' /> {formMessage}</Message>
          </Form>
        </div>
      );
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

const ContainerFragment: SFC<{}> = (props) => {
  const { children } = props;
  return (
    <Container>
      <HeaderComponent />
      <Segment vertical>{children}</Segment>
    </Container>
  );
}

const LoadingFragment: SFC = () => {
  return <h3>Loading</h3>;
}

const NoQuestionFoundFragment: SFC = () => {
  return <Message warning>No question found for id.<br /><Link to='/'><Icon name='home' />Go to home page</Link></Message>;
}

const NoQuestionSelectedFragment: SFC = () => {
  return <Message warning>No question id selected.<br /><Link to='/'><Icon name='home' />Go to home page</Link></Message>;
}

const mapStateToProps = (state: RootState): ComponentStateProps => ({
  events: state.events,
  teams: state.teams,
  question: state.question
});

const mapDispatchToProps = (dispatch): ComponentDispatchProps => ({
  getQuestion: (id: string) => dispatch(getQuestion(id)),
  push: (location: string) => dispatch(push(location))
});

const QuestionContainerConnected = connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);

export { QuestionContainerConnected };
