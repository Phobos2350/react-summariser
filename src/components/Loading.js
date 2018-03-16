import React, { Component } from 'react';
import { css } from 'react-emotion';

const statusStyle = css`
  height: 3rem;
  color: #fff;
  text-transform: uppercase;
`;

class Loading extends Component {
  render() {
    let status = '';
    let time = (this.props.time / 1000).toFixed(2);
    switch (this.props.loadState) {
      case 0:
        status = '';
        break;
      case 1:
        status = 'Fetching Article...';
        break;
      case 2:
        status = 'Summarising...';
        break;
      case 3:
        status = 'Took: ' + time + 's';
      default:
        status = '';
        break;
    }

    return (
      <div>
        <h2 className={statusStyle}>{status}</h2>
      </div>
    );
  }
}

export default Loading;
