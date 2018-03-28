// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';
import { graphql, compose } from 'react-apollo';

import cheerio from 'cheerio';
import sentiment from 'sentiment';

import KeyTerms from './KeyTerms';
import Loading from './Loading';
import NamedEnts from './NamedEnts';
import Sentiment from './Sentiment';
import Stats from './Stats';
import Summary from './Summary';
import urlRegex from '../utils/url-regex';

import { QUERY_SUMMARY, MUTATION_SUMMARY_ADD } from '../graphql/queries';

const cors = 'https://cors-anywhere.herokuapp.com/';
// Heroku-API
//let scrapeUrl = 'https://fierce-anchorage-50232.herokuapp.com/unfluff';
//let summariseUrl = 'https://safe-eyrie-25302.herokuapp.com/summarise';
// Hasura-API
let scrapeUrl = 'https://api.conspicuously76.hasura-app.io/unfluff';
let summariseUrl = 'https://app.conspicuously76.hasura-app.io/summarise';

//if (process.env.NODE_ENV !== 'production') {
scrapeUrl = cors + scrapeUrl;
summariseUrl = cors + summariseUrl;
//}

const Results = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
  grid-auto-rows: minmax(1fr, auto);
  text-align: left;
  font-size: 1rem;

  @media (min-width: 34em) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 50em) {
    grid-template-columns: 1fr 1fr;
  }
`;

const jsonify = (text, length) => {
  return new Promise((resolve, reject) => {
    if (urlRegex().test(text)) {
      //console.log(`URL: ${text}`);
      getWebpage(text)
        .then(unfluffed => {
          //console.log(unfluffed)
          return resolve(
            JSON.stringify({ text: unfluffed, length: parseInt(length, 10) })
          );
        })
        .catch(e => console.error(e));
    } else {
      return resolve(
        JSON.stringify({ text: text, length: parseInt(length, 10) })
      );
    }
  });
};

const getWebpage = url => {
  return new Promise((resolve, reject) => {
    fetch(cors + url)
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (url.includes('nytimes.com')) {
          //console.logconsole.log('NY Times URL');
          return resolve(nyTimes(data));
        } else {
          //console.log('Other URL');
          //fetch(cors + 'https://api.adroit78.hasura-app.io/unfluff', {
          fetch(scrapeUrl, {
            body: data,
            method: 'POST'
          })
            .then(resp => resp.json())
            .then(data => resolve(data['body']));
        }
      })
      .catch(e => console.error(e));
  });
};

const nyTimes = html => {
  let content = '';
  const $ = cheerio.load(html);
  $('.story-body-text').each((i, para) => {
    for (let text of para['children']) {
      if (text.hasOwnProperty('children')) {
        for (let childText of text['children']) {
          content += childText['data'];
        }
      } else {
        content += text['data'];
        if (text['next'] === null) content += '';
      }
    }
  });
  return JSON.stringify(content);
};

class Summariser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namedEnts: [],
      keyTerms: [],
      stats: [],
      summary: [],
      sentiment: [],
      isLoading: false,
      isVisible: false,
      status: 0
    };
  }

  summariseArticle(text, desiredLen) {
    let t0 = performance.now();
    if (desiredLen < 1) desiredLen = 1;
    this.setState({
      isLoading: true,
      isVisible: true,
      status: 1
    });
    // Default all summary lengths to 10 sentences, slice the returned array later
    jsonify(text, 10).then(asJson => {
      let parsed = JSON.parse(asJson);
      let senti = sentiment(parsed['text']);
      let sentiJSON = JSON.stringify({
        score: senti['score'],
        comparative: senti['comparative']
      });
      this.setState({ status: 2, sentiment: senti });

      //fetch(cors + 'https://app.adroit78.hasura-app.io/summarise', {
      fetch(summariseUrl, {
        body: asJson,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then(
          res => res.json(),
          error => console.log('An error occurred.', error)
        )
        .then(result => {
          //console.log(result);
          let parsed = JSON.parse(result);
          let t1 = performance.now();
          console.log('Took ' + Math.ceil(t1 - t0) + 'ms');
          this.setState({
            namedEnts: parsed[0]['Named Entities'],
            keyTerms: parsed[1]['Key Terms'],
            stats: parsed[2]['Stats'],
            summary: parsed[3]['Summary'].slice(0, desiredLen),
            isLoading: false,
            status: 0
          });
          this.props.mutate({
            variables: {
              objects: [
                {
                  url: this.props.text,
                  sentiment: sentiJSON,
                  summary: result
                }
              ]
            }
          });
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.data.loading &&
      nextProps.data.summaries.length <= 0 &&
      !this.state.isVisible
    ) {
      console.log('componentWillReceiveProps summarise trigger');
      this.summariseArticle(nextProps.text, nextProps.desiredLength);
    } else if (!nextProps.data.loading && !this.state.isVisible) {
      console.log('componentWillReceiveProps graphql query trigger');
      let response = JSON.parse(nextProps.data.summaries['0'].summary);
      let senti = JSON.parse(nextProps.data.summaries['0'].sentiment);
      this.setState({
        namedEnts: response[0]['Named Entities'],
        keyTerms: response[1]['Key Terms'],
        stats: response[2]['Stats'],
        summary: response[3]['Summary'].slice(0, nextProps.desiredLength),
        sentiment: senti,
        isLoading: false,
        isVisible: true,
        status: 0
      });
    } else if (nextProps.text !== this.props.text) {
      console.log('componentWillReceiveProps diff URL summarise trigger');
      this.setState({
        namedEnts: [],
        keyTerms: [],
        stats: [],
        summary: [],
        sentiment: [],
        isLoading: false,
        isVisible: true,
        status: 0
      });
      this.summariseArticle(nextProps.text, nextProps.desiredLength);
    }
  }

  componentWillMount() {
    if (
      !this.props.data.loading &&
      this.props.data.summaries.length <= 0 &&
      !this.state.isVisible
    ) {
      console.log('componentWillMount summarise trigger');
      this.summariseArticle(this.props.text, this.props.desiredLength);
    } else if (!this.props.data.loading && !this.state.isVisible) {
      console.log('componentWillMount graphql query trigger');
      let response = JSON.parse(this.props.data.summaries['0'].summary);
      let senti = JSON.parse(this.props.data.summaries['0'].sentiment);
      this.setState({
        namedEnts: response[0]['Named Entities'],
        keyTerms: response[1]['Key Terms'],
        stats: response[2]['Stats'],
        summary: response[3]['Summary'].slice(0, this.props.desiredLength),
        sentiment: senti,
        isLoading: false,
        isVisible: true,
        status: 0
      });
    }
  }

  render() {
    const {
      namedEnts,
      keyTerms,
      stats,
      summary,
      sentiment,
      isLoading,
      status
    } = this.state;

    if (this.props.data.loading) {
      return <Loading loading={true} loadState={3} />;
    }
    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <Loading loading={true} loadState={4} />;
    }

    return (
      <div>
        {isLoading ? <Loading loading={isLoading} loadState={status} /> : null}
        {summary.length > 0 && (
          <Results>
            <Summary data={summary} />
            <Stats data={stats} />
            <KeyTerms data={keyTerms} />
            <Sentiment data={sentiment} />
            <NamedEnts data={namedEnts} />
          </Results>
        )}
      </div>
    );
  }
}

const getSummary = graphql(QUERY_SUMMARY, {
  options: ownProps => ({
    variables: {
      url: ownProps.text
    }
  })
});

const insertSummary = graphql(MUTATION_SUMMARY_ADD);

const SummariseWithData = compose(getSummary, insertSummary)(Summariser);

export default SummariseWithData;
