// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';
import { Route } from 'react-router-dom';

import Feed from './Feed';
import Home from './Home';
import Header from './components/Header';
import Footer from './components/Footer';

const Application = styled('article')`
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Container = styled('main')`
  display: grid;
  grid-gap: 1.5em;
  padding: 1.5em;
  flex-grow: 1;
  flex-shrink: 0;
`;

class App extends Component {
  render() {
    return (
      <Application>
        <Header />
        <Container>
          <Route exact path="/" component={Home} />
          <Route path="/feed" component={Feed} />
        </Container>
        <Footer />
      </Application>
    );
  }
}

export default App;
