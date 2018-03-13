import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'react-emotion';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const backgrounds = [
    `background: #FC466B;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
    background: linear-gradient(to right, #3F5EFB, #FC466B);
    `,
    `background: #ee0979;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);
    background: linear-gradient(to right, #ff6a00, #ee0979);
    `,
    `background: #00F260;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #0575E6, #00F260);
    background: linear-gradient(to right, #0575E6, #00F260);
    `,
    `background: #ad5389;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);
    background: linear-gradient(to right, #3c1053, #ad5389);
    `,
    `background: #DA4453;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);
    background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `,
    `background: #bc4e9c;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `,
    `background: #0f0c29;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `,
    `background: #667db6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `,
    `background: #06beb6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #48b1bf, #06beb6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #48b1bf, #06beb6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `
]

const rand = Math.floor(Math.random() * (backgrounds.length - 1))

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,800');

  html {
    position: relative;
    min-height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    ${backgrounds[rand]}
  }

  ul, ol {
      list-style: none;
      padding: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
