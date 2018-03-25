import React, { Component } from 'react';

class Sentiment extends Component {
  render() {
    return (
      <div>
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
