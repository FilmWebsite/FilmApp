import React from 'react';
import AppRoutes from './AppRoutes.tsx';
import { FooterProvider } from './providers/FooterProvider.tsx';

// Import your publishable key
// Import your publishable key
// @ts-ignore
const PUBLISHABLE_KEY = import.meta.env;

console.log(PUBLISHABLE_KEY);

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key');
// }

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

function App() {
  return (
    <FooterProvider>
      <AppRoutes />
    </FooterProvider>
  );
}

export default App;
