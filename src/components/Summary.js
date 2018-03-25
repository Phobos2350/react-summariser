import React, { Component } from 'react';
import { css } from 'react-emotion';

const summaryStyle = css`
  grid-row: 1;
  grid-column: 1 / 3;
`;

class Summary extends Component {
  render() {
    return (
      <div className={summaryStyle}>
        <h3>Summary</h3>
        {this.props.data.map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
      </div>
    );
  }
}

export default Summary;
