import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import MediaQuery from 'react-responsive';
import MobileNav from './MobileNav';
import { GET_LOGGED_IN_STATUS } from '../queries';
import { history } from '../routers/AppRouter';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__title">
        <img src="/images/swoledb.png" className="header__title__icon"/>
        <h1 className="header__title__text">SwoleDB</h1>
      </div>
      <div className="header__nav">
        <Query query={GET_LOGGED_IN_STATUS}>
          {({ data, client }) => {
            // For keeping track of Apollo store isLoggedIn prop,
            // since ApolloDevtool sucks
            console.log('isLoggedIn: ', data.isLoggedIn)

            return (
              data.isLoggedIn && (
                <MediaQuery minWidth={720}>
                  {(matches) => (
                    matches ? (
                      <Fragment>
                        <NavLink to="/dashboard" className="header__nav__link" activeClassName="is-active">Exercise Search</NavLink>
                        <NavLink exact to="/add-exercise" className="header__nav__link" activeClassName="is-active">Add Exercise</NavLink>
                        <button
                          className="button header__nav__button"
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
                    ) : <MobileNav client={client} />
                  )}
                </MediaQuery>
              )
            );
          }}
        </Query>
      </div>
    </div>
  </header>
);

export default Header;