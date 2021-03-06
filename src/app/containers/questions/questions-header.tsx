import * as React from 'react';
import { Component, ReactNode } from 'react';

interface ComponentProps {
  details?: string;
  question: string;
}

class QuestionsHeader extends Component<ComponentProps> {

  public render(): ReactNode {
    const { details, question } = this.props;

    if (details) {
      return (
        <div className="question-header">
          <h3>{details}</h3>
          <h4>{question}</h4>
        </div>
      );
    } else {
      return (
        <div className="question-header">
          <h4>{question}</h4>
        </div>
      );
    }
  }
}

export { QuestionsHeader };
