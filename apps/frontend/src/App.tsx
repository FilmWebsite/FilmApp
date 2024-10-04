import React from 'react';
import AppRoutes from './AppRoutes.tsx';
import { FooterProvider } from './providers/FooterProvider.tsx';

function App() {
  return (
    <FooterProvider>
      <AppRoutes />
    </FooterProvider>
  );
}

export default App;
