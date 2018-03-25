import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { HashRouter as Router } from 'react-router-dom';
import { injectGlobal } from 'react-emotion';

import * as global from './utils/config';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Lato', 'Merriweather:300i']
  }
});

injectGlobal`

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    color: ${global.PRI_COLOUR};
    background-color: ${global.BG_COLOUR};
  }

  a, button, legend, input, textarea { 
    font-family: 'Merriweather', serif;
    font-weight: 300;
    font-style: italic;
  }

  a {
    background-image: none;
    color: ${global.LINK_COLOUR};
    text-decoration: none;
    text-shadow: none;
    border-bottom: 1px dashed ${global.LINK_COLOUR};
    display: inline-block;
    position: relative;
    padding: 0 .2em;
    -webkit-transition: all 250ms;
    transition: all 250ms;
    z-index: 200;
    &:before {
      content: "";
      z-index: -1;
      width: 100%;
      height: 0%;
      background: ${global.LINK_HOVER_COLOUR};
      bottom: 0;
      left: 0;
      position: absolute;
      transition: height 250ms;
    }
    &:hover{
      cursor: pointer;
      color: #fff;
      border-color:transparent;
      &:before{
        height:100%;
      }
    }
  }

  button {
    background: none;
    color: ${global.PRI_COLOUR};
    text-decoration: none;
    display: inline-block;
    position: relative;
    padding: 0.75rem;
    border: 1px solid ${global.PRI_COLOUR};
    transition: all 250ms;
    text-transform: uppercase;
    width: 100%;
    margin: 1rem auto 0 auto;
    &:before {
      content: '';
      z-index: -1;
      width: 100%;
      height: 0%;
      background: ${global.LINK_HOVER_COLOUR};
      bottom: 0;
      left: 0;
      position: absolute;
      transition: height 250ms;
    }
    &:hover {
      border-color: transparent;
      color: #fff;
      &:before {
        height: 100%;
      }
    }
    &:focus {
      outline: none;
    }
  }

  input, select, textarea {
    resize: none;
    font-size: 1rem;
    display: inline-block;
    background: #fff;
    padding: 0.5rem;
    line-height: 1.9;
    border: none;
    border-bottom: 1px solid #aaa;
    width: auto;
    transition: all 750ms ease;
    box-shadow: none;
    &:focus {
      outline: none;
    }
  }
  
  ul, ol {
    list-style: none;
    padding: 0;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Merriweather', serif;
    font-weight: 300;
    font-style: italic;
    color: ${global.PRI_COLOUR};
    text-transform: uppercase;
  }

`;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
