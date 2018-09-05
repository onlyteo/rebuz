import * as React from 'react';
import { Component, ReactNode } from 'react';

import './home.css';

class Home extends Component {

  public render(): ReactNode {

    return (
      <div className="container home-container">
        <header className="home-header">
          <h1 className="home-title">Rebuz</h1>
        </header>
      </div>
    );
  }
}

export default Home;
