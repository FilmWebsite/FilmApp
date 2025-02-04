import FilmRoutes from './Routes.tsx';
import { FooterProvider } from './providers/FooterProvider.tsx';

const PUBLISHABLE_KEY = import.meta.env;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  return (
    <FooterProvider>
      <FilmRoutes />
    </FooterProvider>
  );
}

export default App;
