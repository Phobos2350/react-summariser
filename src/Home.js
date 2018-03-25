// @flow
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';

import Form from './components/Form';
import Summariser from './components/Summariser';

const Layout = styled('div')`
  display: grid;
  grid-gap: 1.5rem;
  @media (min-width: 34em) {
    width: 90%;
    margin: 1rem;
  }
  @media (min-width: 50em) {
    width: 70%;
    margin: 0 auto;
  }
`;

const SummaryContainer = styled('section')`
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 3px 3px 12px 0px #afafaf;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      desiredLen: '',
      summarise: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    let text = data.get('toSummarise');
    let desiredLen = data.get('length');

    this.setState({
      text: text,
      desiredLen: desiredLen,
      summarise: true
    });
  }

  render() {
    const { text, desiredLen, summarise } = this.state;

    return (
      <Layout>
        <Helmet>
          <title>Summariser - Summarise</title>
        </Helmet>
        <Form handleSubmit={this.handleSubmit} />
        {this.state.summarise && (
          <SummaryContainer>
            <Summariser
              text={text}
              desiredLength={desiredLen}
              summarise={summarise}
            />
          </SummaryContainer>
        )}
      </Layout>
    );
  }
}

export default Home;
