import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import SignupForm from './SignupForm';

const Signup = () => (
  <ApolloConsumer>
    {(client) => (
      <SignupForm client={client} />
    )}
  </ApolloConsumer>
);

export default Signup;