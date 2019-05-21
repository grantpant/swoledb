import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>SwoleDB</h1>
    <NavLink exact to="/" activeClassName="is-active">Add Exercise</NavLink>
    <NavLink to="/search" activeClassName="is-active">Search Exercises</NavLink>
  </header>
);

export default Header;