import React from 'react';
import AppRoutes from './AppRoutes';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
