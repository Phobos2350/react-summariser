import React, { Component } from 'react';
import { css } from 'react-emotion';

const alignRight = css`
  text-align: right;
`;
class NamedEnts extends Component {
  render() {
    return (
      <div className={alignRight}>
        <h3>Named Entities</h3>
        <ul>
          {this.props.data.map((ent, index) => <li key={index}>{ent}</li>)}
        </ul>
      </div>
    );
  }
}

export default NamedEnts;
