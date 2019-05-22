import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="container header__container">
      <h1 className="header__title">SwoleDB</h1>
      <div className="header__nav">
        <NavLink exact to="/" className="header__nav__link" activeClassName="is-active">Add Exercise</NavLink>
        <NavLink to="/search" className="header__nav__link" activeClassName="is-active">Search Exercises</NavLink>
      </div>
    </div>
  </header>
);

export default Header;