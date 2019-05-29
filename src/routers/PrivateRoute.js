import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import {  GET_LOGGED_IN_STATUS } from '../queries';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_LOGGED_IN_STATUS}>
    {({ data }) => (
      <Route {...rest} render={(props) => (
        data.isLoggedIn
          ? <Component {...props} />
          : <Redirect to="/" />
      )} />
    )}
  </Query>
);

export default PrivateRoute;