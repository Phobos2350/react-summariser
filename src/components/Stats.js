import React, { Component } from 'react';
import { css } from 'react-emotion';

class Stats extends Component {
  render() {
    const reduction = Math.floor(this.props.data['Percent_reduction_amt']);
    const originalLen = this.props.data['Before_Length'];
    const summaryLen = this.props.data['After_Length'];
    const originalTime = Math.ceil(this.props.data['Before_Read_Time']);
    const summaryTime = Math.ceil(this.props.data['After_Read_Time']);
    const smog = Math.floor(this.props.data['Before_SMOG']);

    return (
      <div
        className={css`
          grid-column: 2;
          grid-row: 2;
        `}
      >
        <h3>Stats</h3>
        <ul>
          <li>Percent Reduction: {reduction}%</li>
          <li>Original Length: {originalLen} words</li>
          <li>Summary Length: {summaryLen} words</li>
          <li>
            Original Read Time: {originalTime}
            {originalTime > 1 ? ' minutes' : ' minute'}
          </li>
          <li>
            Summary Read Time: {summaryTime}
            {summaryTime > 1 ? ' minutes' : ' minute'}
          </li>
          <li>Original Complexity (SMOG Index): {smog}</li>
        </ul>
      </div>
    );
  }
}

export default Stats;
