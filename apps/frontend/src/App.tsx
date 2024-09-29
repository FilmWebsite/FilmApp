import React from 'react';
import AppRoutes from './AppRoutes';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FooterProvider } from './providers/FooterProvider.tsx';

function App() {
  return (
    <FooterProvider>
      <AppRoutes />
    </FooterProvider>
  );
}

export default App;
