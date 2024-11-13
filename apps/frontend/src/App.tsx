import { useEffect } from 'react';
import FilmRoutes from './Routes.tsx';
import { FooterProvider } from './providers/FooterProvider.tsx';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`http://localhost:8080/online`);
        if (!response.ok) throw new Error('Backend unavailable check node');
      } catch (error) {
        navigate('/fallback');
      }
    };
    checkBackend();
  }, [navigate]);

  return (
    <FooterProvider>
      <FilmRoutes />
    </FooterProvider>
  );
}

export default App;
