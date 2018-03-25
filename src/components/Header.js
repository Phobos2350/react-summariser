import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { NavLink } from 'react-router-dom';

import * as global from '../utils/config';

const Head = styled('header')`
  text-align: center;
  flex-shrink: 0;
`;

const Nav = styled('ul')`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  text-transform: uppercase;
`;

const NavItem = styled('li')`
  margin-top: 0.5rem;
  @media (min-width: 34em) {
    display: block;
    margin-left: 0;
  }
  @media (min-width: 40em) {
    display: inline-block;
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
  & a {
    color: ${global.SEC_COLOUR};
    border-bottom: none;
    &:before {
      background: ${global.LINK_HOVER_COLOUR};
    }
    &:hover {
      color: #fff;
    }
    &.is-active {
      color: #fff;
      &:before {
        height: 100%;
      }
    }
  }
`;

const Banner = styled('section')`
  & h1 {
    font-size: 4rem;
  }
`;

const spanStyle = css`
  font-size: 1.5rem;
  color: ${global.LINK_HOVER_COLOUR};
`;

class Header extends Component {
  render() {
    return (
      <Head>
        <Nav>
          <NavItem>
            <NavLink exact={true} activeClassName="is-active" to="/">
              Summariser
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="is-active" to="/feed">
              News Feed
            </NavLink>
          </NavItem>
        </Nav>
        <Banner>
          <h1>
            Summariser <span className={spanStyle}>beta</span>
          </h1>
        </Banner>
      </Head>
    );
  }
}

export default Header;
