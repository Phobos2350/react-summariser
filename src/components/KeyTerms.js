import React, { Component } from 'react';
import { css } from 'react-emotion';

const alignRight = css`
  text-align: right;
`;
class KeyTerms extends Component {
  render() {
    return (
      <div className={alignRight}>
        <h3>Key Terms</h3>
        <ul>
          {this.props.data.map((term, index) => (
            <li key={index}>
              {term[0]} - {Math.floor(term[1] * 100)}%
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default KeyTerms;
