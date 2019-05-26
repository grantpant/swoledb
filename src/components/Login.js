import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import LoginForm from './LoginForm';

const Login = () => (
  <ApolloConsumer>
    {(client) => (
      <LoginForm client={client} />
    )}
  </ApolloConsumer>
);

export default Login;