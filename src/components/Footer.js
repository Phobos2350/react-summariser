import React, { Component } from 'react';
import styled from 'react-emotion';

const Foot = styled('footer')`
  flex-shrink: 0;
  text-align: center;
  font-size: 0.85rem;
`;

class Footer extends Component {
  render() {
    return (
      <Foot>
        <p>
          By
          <a
            title="AF02"
            href="https://compassionate-heyrovsky-a09abf.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AF02
          </a>{' '}
          - v0.7.0
        </p>
        <p>
          Powered by{' '}
          <a
            title="React JS"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>,{' '}
          <a
            title="Textacy"
            href="https://github.com/chartbeat-labs/textacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Textacy
          </a>{' '}
          &{' '}
          <a
            title="spaCy"
            href="https://spacy.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spacy
          </a>
        </p>
      </Foot>
    );
  }
}

export default Footer;
