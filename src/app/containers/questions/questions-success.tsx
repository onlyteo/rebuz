import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Button, ButtonProps, Icon, Message } from 'semantic-ui-react'

import { Question } from "../../models";
import { QuestionsHeader } from "./questions-header";

interface ComponentProps {
  question: Question;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
}

class QuestionsSuccess extends Component<ComponentProps> {

  public render(): ReactNode {
    const { question, onClick } = this.props;
    const { details: detailsText, question: questionText } = question;

    return (
      <div>
        <QuestionsHeader details={detailsText} question={questionText} />
        <Message info><Icon name='thumbs up' /> Correct!</Message>
        <p>
          <Button primary onClick={onClick}>
            Next question! <Icon name="arrow right" />
          </Button>
        </p>
      </div>
    );
  }
}

export { QuestionsSuccess };
