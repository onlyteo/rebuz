import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Header, Icon } from 'semantic-ui-react'

interface ComponentProps {
  title: string;
  subtitle?: string;
}

class MainHeader extends Component<ComponentProps> {

  public render(): ReactNode {
    const title = this.processTitle();

    document.title = title;

    return (
      <Header as='h1'>
        <a className="header-link" href="/">
          <Icon name='map' />{title}
        </a>
      </Header>
    );
  }

  private processTitle() {
    const { title, subtitle } = this.props;
    if (subtitle) {
      return `${title} - ${subtitle}`;
    } else {
      return `${title}`;
    }
  }
}

export { MainHeader };
