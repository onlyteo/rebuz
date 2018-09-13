import * as React from 'react';
import { ChangeEventHandler, Component, ReactNode, SFC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { push, RouterAction } from 'react-router-redux';
import { Container, Form, Icon, Message, Segment } from 'semantic-ui-react'

import { HeaderComponent } from '../../components/header';
import { EventState, Question, QuestionState, RootState, TeamState } from "../../models";
import { getQuestion } from '../../state/actions';

import './question.css';

interface ComponentState {
  shouldRedirect: boolean;
  redirectEventId: string;
  formEventId: string;
  formSubmitted: boolean;
  formError: boolean;
  formInputPlaceholder: string;
  formButtonIcon: string;
  formErrorMessage: string;
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

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

class QuestionContainer extends Component<ComponentProps, ComponentState> {

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
    const { formEventId, formSubmitted, formError, formErrorMessage, formInputPlaceholder, formButtonIcon } = this.state

    return (
      <div>
        <h3>{details}</h3>
        <h4>{question}</h4>
        <Form onSubmit={this.handleSubmit} error={formError}>
          <Form.Group>
            <Form.Input placeholder={formInputPlaceholder} value={formEventId} onChange={this.handleChange} error={formError} />
            <Form.Button primary icon={formButtonIcon} loading={formSubmitted} />
          </Form.Group>
          <Message error>{formErrorMessage}</Message>
        </Form>
      </div>
    );
  }

  private handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const newState = { formEventId: value, formError: false, formSubmitted: false }
    this.setState(newState);
  }

  private handleSubmit = () => {
    const { formEventId } = this.state;

    if (formEventId.length == 6) {
      const newState = { formSubmitted: true, formError: false }
      this.setState(newState);
      //this.props.findEvents(formEventId);
    } else {
      this.setFormError('Event id must be a six character code');
    }
  }

  private setFormError = (message: string) => {
    const newState = { formSubmitted: false, formError: true, formErrorMessage: message }
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
