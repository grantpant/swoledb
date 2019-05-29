import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AppRouter from './routers/AppRouter';
import 'antd/lib/notification/style/index.css';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  uri: process.env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('jwt')
  }
});

// For Chrome Apollo Devtools
window.__APOLLO_CLIENT__ = client;

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
  , document.getElementById('root')
);