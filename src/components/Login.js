import React, { Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Login = (props) => (
  <ApolloConsumer>
    {(client) => (
      <Fragment>
        <SignupForm
          client={client}
          push={props.history.push}
        />
        <LoginForm
          client={client}
          push={props.history.push}
        />
      </Fragment>
    )}
  </ApolloConsumer>
);

export default Login;