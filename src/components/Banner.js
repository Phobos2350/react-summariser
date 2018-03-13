import React, { Component } from 'react';
import { css } from 'react-emotion';

const header = css`
  background-color: none;
  min-height: 5rem;
  padding: 2rem;
  color: white;
`;

const titleStyle = css`
  font-size: 3.5em;
  text-transform: uppercase;
`;

class Banner extends Component {
  render() {
    return (
      <header className={header}>
        <h1 className={titleStyle}>Article Summariser</h1>
      </header>
    );
  }
}

export default Banner;
