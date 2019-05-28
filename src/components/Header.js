import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { history } from '../routers/AppRouter';

const GET_LOGGED_IN_STATUS = gql`
  query {
    isLoggedIn @client
  }
`;

const Header = () => (
  <header className="header">
    <div className="container header__container">
      <div className="header__title">
        <img src="/images/swoledb.png" className="header__title__icon"/>
        <h1 className="header__title__text">SwoleDB</h1>
        <img src="/images/swoledb.png" className="header__title__icon"/>
      </div>
      <div className="header__nav">
        <Query query={GET_LOGGED_IN_STATUS}>
          {({ data, client }) => {
            console.log('isLoggedIn: ', data.isLoggedIn)
            return (
              data.isLoggedIn && (
                <Fragment>
                  <NavLink exact to="/" className="header__nav__link" activeClassName="is-active">Add Exercise</NavLink>
                  <NavLink to="/search" className="header__nav__link" activeClassName="is-active">Search Exercises</NavLink>
                  <button
                    onClick={() => {
                      client.writeData({
                        data: { isLoggedIn: false }
                      });
                      localStorage.clear();
                      history.push('/');
                    }}
                  >
                    Logout
                  </button>
                </Fragment>
              )
            );
          }}
        </Query>
      </div>
    </div>
  </header>
);

export default Header;