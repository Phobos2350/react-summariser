import React, { Component } from 'react';
import { css } from 'react-emotion';

const formStyle = css`
  display: grid;
  grid-template-columns: 1fr 60px 120px;
  grid-gap: 10px;
  grid-auto-rows: minmax(20px, 50px);
`;

const labelStyle = css`
  display: inline-block;
  text-transform: uppercase;
  color: #fff;
`;

const inputStyle = css`
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
`;

const lengthStyle = css`
  text-align: center;
  width: auto;
`;

const buttonStyle = css`
  background: none;
  color: #fff;
  text-decoration: none;
  display: inline-block;
  position: relative;
  padding: 0.75rem;
  border: 1px solid #fff;
  transition: all 250ms;
  text-transform: uppercase;

  &:before {
    content: '';
    z-index: -1;
    width: 100%;
    height: 0%;
    background: #fff;
    bottom: 0;
    left: 0;
    position: absolute;
    transition: height 250ms;
  }
  &:hover {
    border-color: transparent;
    color: #333;
    &:before {
      height: 100%;
    }
  }
  &:focus {
    outline: none;
  }
`;

class Form extends Component {
  render() {
    return (
      <form className={formStyle} onSubmit={this.props.handleSubmit}>
        <label
          className={css`
            ${labelStyle};
            grid-column: 1;
            grid-row: 1;
          `}
          htmlFor="toSummarise"
        >
          URL/Paste Text
        </label>
        <textarea
          className={css`
            ${inputStyle};
            grid-column: 1;
            grid-row: 2;
          `}
          id="toSummarise"
          name="toSummarise"
          type="text"
          placeholder="http://example.com"
          required
        />

        <label
          className={css`
            ${labelStyle};
            grid-column: 2;
            grid-row: 1;
          `}
          htmlFor="length"
        >
          Length
        </label>
        <input
          className={css`
            ${inputStyle};
            ${lengthStyle};
            grid-column: 2;
            grid-row: 2;
          `}
          id="length"
          name="length"
          type="number"
          min="1"
          max="20"
          required
        />

        <button
          className={css`
            ${buttonStyle};
            grid-column: 3;
            grid-row: 2;
          `}
        >
          Summarise
        </button>
      </form>
    );
  }
}

export default Form;
