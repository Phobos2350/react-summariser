import React, { Component } from 'react';
import styled from 'react-emotion';

import Summariser from './Summariser';

const Story = styled('div')`
  background-color: #fff;
  text-align: left;
  padding: 1.5rem;
  box-shadow: 3px 3px 12px 0px #afafaf;
  h2,
  h3,
  h4,
  h5 {
    margin: 0.25rem 0 0 0.25rem;
  }
`;

const Headline = styled('h3')`
  font-size: 1.2rem;
  font-weight: 600;
  a {
    border: none;
    &:hover {
      color: #fff;
    }
  }
`;

const SubHeading = styled('h4')`
  font-size: 0.85rem;
  font-weight: 400;
  padding-left: 0.3rem;
`;

const Time = styled('span')`
  font-size: 0.75rem;
  padding-left: 1rem;
`;

const Button = styled('a')`
  font-size: 1rem;
  text-transform: uppercase;
  margin-left: 0.3rem;
  &:hover {
    color: #fff;
  }
`;

const SummaryContainer = styled('div')`
  color: #222;
  padding: 0.2em;
  margin: 1.5rem 0.2em 0rem 0.2em;
`;

class NewsStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSummary: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(prevState => ({
      toggleSummary: !prevState.toggleSummary
    }));
  }

  render() {
    let time = new Date(this.props.published).toLocaleString();
    return (
      <Story>
        <Headline>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            {this.props.title}
          </a>
        </Headline>
        <SubHeading>
          {this.props.source}
          <Time>{time}</Time>
        </SubHeading>
        <Button
          onClick={this.handleClick}
          style={{ display: this.state.toggleSummary ? 'none' : 'inline' }}
        >
          Summarise...
        </Button>
        {this.state.toggleSummary && (
          <SummaryContainer>
            <Summariser text={this.props.url} desiredLength={5} />
          </SummaryContainer>
        )}
      </Story>
    );
  }
}

export default NewsStory;
