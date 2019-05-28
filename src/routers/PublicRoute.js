import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_LOGGED_IN_STATUS } from '../queries';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_LOGGED_IN_STATUS}>
    {({ data }) => (
      <Route {...rest} render={(props) => (
          data.isLoggedIn
            ? <Redirect to="/dashboard" />
            : <Component {...props} />
      )} />
    )}
  </Query>
);

export default PublicRoute;