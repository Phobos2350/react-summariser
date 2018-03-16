import React, { Component } from 'react';
import { css } from 'react-emotion';

const header = css`
  background-color: none;
  min-height: 5rem;
  padding: 2rem;
  color: white;
`;

const titleStyle = css`
  font-size: 3.5rem;
  text-transform: uppercase;
`;

const spanStyle = css`
  font-size: 1rem;
  text-transform: uppercase;
  color: #ddd;
`;

class Banner extends Component {
  render() {
    return (
      <header className={header}>
        <h1 className={titleStyle}>
          Summariser <span className={spanStyle}>beta</span>
        </h1>
      </header>
    );
  }
}

export default Banner;
