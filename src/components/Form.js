import React, { Component } from 'react';
import styled, { css } from 'react-emotion';

const formStyle = css`
  display: grid;
  text-align: center;
  grid-gap: 0.5rem;
  @media (min-width: 34em) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 50em) {
    grid-template-columns: 1fr 80px;
  }
`;

const FormItem = styled('div')`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(20px, 50px);
`;

const Label = styled('label')`
  font-size: 1rem;
  line-height: 50px;
  display: inline-block;
  text-transform: uppercase;
`;

const pasteLabel = css`
  @media (min-width: 34em) {
    padding-left: 5rem;
  }
`;

const buttonStyle = css`
  max-width: 150px;
  @media (min-width: 34em) {
    grid-column: 1 / 3;
  }
  @media (min-width: 50em) {
    grid-template-columns: 1 / 3;
  }
`;

class Form extends Component {
  render() {
    return (
      <form className={formStyle} onSubmit={this.props.handleSubmit}>
        <FormItem>
          <Label htmlFor="toSummarise" className={pasteLabel}>
            URL/Paste Text
          </Label>
          <textarea
            id="toSummarise"
            name="toSummarise"
            type="text"
            placeholder="http://example.com"
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="length">Length</Label>
          <input
            style={{ textAlign: 'center' }}
            id="length"
            name="length"
            type="number"
            min="1"
            max="20"
            required
          />
        </FormItem>
        <button className={buttonStyle}>Summarise</button>
      </form>
    );
  }
}

export default Form;
