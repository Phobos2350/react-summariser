// @flow
import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import cheerio from 'cheerio';
import sentiment from 'sentiment';

import Banner from './components/Banner';
import Form from './components/Form';
import KeyTerms from './components/KeyTerms';
import Loading from './components/Loading';
import NamedEnts from './components/NamedEnts';
import Sentiment from './components/Sentiment';
import Stats from './components/Stats';
import Summary from './components/Summary';
import { Box } from './components/Layout';
import urlRegex from './utils/url-regex';

const cors = 'https://cors-anywhere.herokuapp.com/';

const Results = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-auto-rows: minmax(1fr, auto);
  text-align: left;
`;

const appStyle = css`
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namedEnts: [],
      keyTerms: [],
      stats: [],
      summary: [],
      isLoading: false,
      status: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    let text = data.get('toSummarise');
    let desiredLen = data.get('length');

    if (desiredLen < 1) desiredLen = 1;
    this.setState({ isLoading: true, status: 1 });
    this.setState({ text: text, desiredLength: desiredLen });

    jsonify(text, desiredLen).then(asJson => {
      let parsed = JSON.parse(asJson);
      let senti = sentiment(parsed['text']);
      this.setState({ status: 2 });

      fetch(cors + 'https://safe-eyrie-25302.herokuapp.com/summarise', {
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
          let parsed = JSON.parse(result);
          this.setState({
            namedEnts: parsed[0]['Named Entities'],
            keyTerms: parsed[1]['Key Terms'],
            stats: parsed[2]['Stats'],
            summary: parsed[3]['Summary'],
            sentiment: senti,
            isLoading: false,
            status: 0
          });
        });
    });
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

    return (
      <div className={appStyle}>
        <Box>
          <Box
            width={[1, 1, 1 / 2]}
            m={['3.5rem 0 0 0', '3.5rem 0 0 0', '3.5rem auto 0 auto']}
            px={[3, 3, 0]}
            align="center"
          >
            <Banner />
          </Box>
        </Box>
        <Box py={[3, 3, 4]}>
          <Box width={[1, 1, 1 / 2]} m="0 auto" px={[3, 2, 0]}>
            <Form handleSubmit={this.handleSubmit} />
          </Box>
          <Box width={[1, 1, 1 / 2]} m="0 auto" px={[3, 3, 0]}>
            <Loading loading={isLoading} loadState={status} />
            {summary.length > 0 && (
              <Results>
                <Summary data={summary} />
                <Sentiment data={sentiment} />
                <Stats data={stats} />
                <KeyTerms data={keyTerms} />
                <NamedEnts data={namedEnts} />
              </Results>
            )}
          </Box>
        </Box>
      </div>
    );
  }
}

const jsonify = (text, length) => {
  return new Promise((resolve, reject) => {
    if (urlRegex().test(text)) {
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
          console.log('NY Times URL');
          return resolve(nyTimes(data));
        } else {
          console.log('Other URL');
          fetch(cors + 'https://fierce-anchorage-50232.herokuapp.com/unfluff', {
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

export default App;
