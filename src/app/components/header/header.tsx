import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Header, Icon } from 'semantic-ui-react'

interface ComponentProps {
  subtitle?: string;
}

class HeaderComponent extends Component<ComponentProps> {

  state = {
    mainTitle: 'Rebuz'
  }

  public render(): ReactNode {
    const title = this.processTitle();

    document.title = title;

    return (
      <Header as='h1'>
        <Icon name='map' />{title}
      </Header>
    );
  }

  private processTitle() {
    const { subtitle } = this.props;
    const { mainTitle } = this.state;
    if (subtitle) {
      return `${mainTitle} - ${subtitle}`;
    } else {
      return mainTitle;
    }
  }
}

export { HeaderComponent };
