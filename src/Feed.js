// @flow
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'react-emotion';

import NewsStory from './components/NewsStory';

const Results = styled('div')`
  display: grid;
  grid-gap: 1.5rem;
  @media (min-width: 50em) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Form = styled('form')`
  display: grid;
  text-align: left;
  grid-gap: 0.5rem;
  text-transform: uppercase;
  @media (min-width: 34em) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 50em) {
    grid-template-columns: 3fr 0.5fr;
  }
  & fieldset {
    border: none;
  }
  & legend {
    font-size: 1rem;
  }
`;
const Label = styled('label')`
  font-size: 0.85rem;
  line-height: 50px;
  display: inline-block;
  text-transform: uppercase;
  margin: 0 1rem;
`;

const FormFields = styled('div')`
  display: grid;
  grid-auto-rows: min-content;
  text-align: left;
  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 70em) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Fields = styled('fieldset')`
  margin: 0.5rem 0;
  padding: 0;
  & legend {
    padding: 0.5rem 0;
  }
`;

const FormItem = styled('div')`
  max-height: 35px;
  line-height: 35px;
`;

const SearchBox = styled('input')`
  width: 100%;
  align-self: end;
`;

const buttonStyle = css`
  height: 3rem;
  align-self: end;
  justify-self: center;
  margin-bottom: -0.2rem;
`;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldFetch: false,
      articles: [],
      sources: ['bbc-news', 'reuters'],
      pageSize: 20,
      keywords: ''
    };
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSourceChange(event) {
    let sources = this.state.sources;
    let val = event.target.value;
    if (this.state.sources.includes(val)) {
      sources = sources.filter(e => e !== val);
    } else {
      sources.push(val);
    }
    this.setState({
      sources: sources
    });
  }

  handleNumberChange(event) {
    let val = event.target.value;
    this.setState({
      pageSize: parseInt(val, 10)
    });
  }

  handleKeywordChange(event) {
    let val = event.target.value;
    let str = val.split(' ').join();
    this.setState({
      keywords: str
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ articles: [] });
    let url =
      'https://newsapi.org/v2/top-headlines?' +
      'sources=' +
      this.state.sources.join() +
      '&pageSize=' +
      this.state.pageSize +
      '&q=' +
      this.state.keywords +
      '&apiKey=f2217640003f4b5bb76885f2e8f99e6b';
    this.fetchArticles(url);
  }

  fetchArticles(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ articles: data['articles'] });
      });
  }

  componentWillMount() {
    let url =
      'https://newsapi.org/v2/top-headlines?' +
      'sources=' +
      this.state.sources.join() +
      '&pageSize=' +
      this.state.pageSize +
      '&q=' +
      this.state.keywords +
      '&apiKey=f2217640003f4b5bb76885f2e8f99e6b';
    this.fetchArticles(url);
  }

  render() {
    const { articles } = this.state;

    return (
      <Results>
        <Helmet>
          <title>Summariser - News Feed</title>
        </Helmet>
        <div>
          <Form>
            <Fields name="sources">
              <legend>Sources</legend>
              <FormFields>
                <FormItem>
                  <input
                    defaultChecked
                    type="checkbox"
                    name="bbc"
                    value="bbc-news"
                    onChange={this.handleSourceChange}
                  />
                  <Label htmlFor="bbc">BBC News</Label>
                </FormItem>
                <FormItem>
                  <input
                    defaultChecked
                    type="checkbox"
                    name="reuters"
                    value="reuters"
                    onChange={this.handleSourceChange}
                  />
                  <Label htmlFor="reuters">Reuters</Label>
                </FormItem>
                <FormItem>
                  <input
                    type="checkbox"
                    name="economist"
                    value="the-economist"
                    onChange={this.handleSourceChange}
                  />
                  <Label htmlFor="economist">The Economist</Label>
                </FormItem>
                <FormItem>
                  <input
                    type="checkbox"
                    name="wsj"
                    value="the-wall-street-journal"
                    onChange={this.handleSourceChange}
                  />
                  <Label htmlFor="wsj">Wall Street Journal</Label>
                </FormItem>
                <FormItem>
                  <input
                    type="checkbox"
                    name="ap"
                    value="associated-press"
                    onChange={this.handleSourceChange}
                  />
                  <Label htmlFor="ap">Associated Press</Label>
                </FormItem>
              </FormFields>
            </Fields>
            <Fields name="number">
              <legend>Articles</legend>
              <select name="number" onChange={this.handleNumberChange}>
                <option value="10" defaultValue>
                  10
                </option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </Fields>
            <Fields name="keywords">
              <legend>Keywords</legend>
              <FormItem>
                <SearchBox
                  type="search"
                  name="keywords"
                  onChange={this.handleKeywordChange}
                  placeholder="Space between keywords"
                />
                <Label htmlFor="keywords" />
              </FormItem>
            </Fields>
            <button
              className={buttonStyle}
              name="filter"
              onClick={this.handleClick}
            >
              Filter
            </button>
          </Form>
        </div>
        {articles.length > 0 &&
          articles.map((story, index) => (
            <NewsStory
              key={index}
              title={story.title}
              source={story.source['name']}
              published={story.publishedAt}
              url={story.url}
              handleSummarise={this.handleSummarise}
            />
          ))}
      </Results>
    );
  }
}

export default Feed;
