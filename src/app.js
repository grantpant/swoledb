import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AppRouter from './routers/AppRouter';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJzd29sZWRiQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1NTc4NDkyODksImV4cCI6MTU1ODQ1NDA4OX0.yFp_azTalEUltAl9QUJjvCm7EMZCVUDImC7n-IKOH4U'
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
  , document.getElementById('root')
);