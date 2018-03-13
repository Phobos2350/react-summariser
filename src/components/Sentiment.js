import React, { Component } from 'react';
import { css } from 'react-emotion';

class Sentiment extends Component {
  render() {
    return (
      <div
        className={css`
          grid-column: 1;
          grid-row: 2;
        `}
      >
        <h3>Sentiment</h3>
        <ul>
          <li>Total Score: {this.props.data['score']}</li>
          <li>Weighted Score: {this.props.data['comparative'].toFixed(3)}</li>
        </ul>
      </div>
    );
  }
}

export default Sentiment;
