import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom'

import { StatsSearchContainer } from './stats-seach';
import { StatsDisplayContainer } from './stats-display';

import './stats.css';

class Stats extends Component {

  public render(): ReactNode {
    return (
      <Switch>
        <Route exact path="/stats" component={StatsSearchContainer} />
        <Route exact path="/stats/:eventId?" component={StatsDisplayContainer} />
      </Switch>
    );
  }
}

export { Stats as StatsContainer };
