import React, { Component } from 'react';
import styled from 'react-emotion';
import { FoldingCube } from 'better-react-spinkit';

import { LINK_HOVER_COLOUR } from '../utils/config';

const LoadingContainer = styled('section')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const Loader = styled('div')`
  max-width: 50%;
  text-align: center;
`;

const Spinner = styled('span')`
  display: inline-block;
`;

const Status = styled('span')`
  display: block;
`;

class Loading extends Component {
  render() {
    let status = '';
    switch (this.props.loadState) {
      case 0:
        status = '';
        break;
      case 1:
        status = 'Reading the Article...';
        break;
      case 2:
        status = 'Summarising...';
        break;
      case 3:
        status = 'Checking Cache for Saved Summary...';
        break;
      case 4:
        status = 'An Error Occurred';
        break;
      default:
        status = '';
        break;
    }

    return (
      <LoadingContainer>
        <Loader>
          <Spinner>
            <FoldingCube size={70} color={LINK_HOVER_COLOUR} />
          </Spinner>
          <Status>
            <h3>{status}</h3>
          </Status>
        </Loader>
      </LoadingContainer>
    );
  }
}

export default Loading;
