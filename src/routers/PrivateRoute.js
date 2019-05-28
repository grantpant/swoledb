import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const GET_LOGGED_IN_STATUS = gql`
    query {
      isLoggedIn @client
    }
  `;

  return (
    <Query query={GET_LOGGED_IN_STATUS}>
      {({ data }) => (
        <Route {...rest} render={(props) => (
          data.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        )} />
      )}
    </Query>
  );
};

export default PrivateRoute;