import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './Footer.tsx';
import { offFooter, useFooterDispatch } from './providers/FooterProvider.tsx';
import { Landing } from './Landing.tsx';
import { Collection } from './Collection.tsx';

import { About } from './About.tsx';
import Downloads from './Downloads.tsx';
import Dedication from './Dedication.tsx';

function FilmRoutes() {
  const location = useLocation();
  const footerDispach = useFooterDispatch(); // Manage footer visibility globally

  useEffect(() => {
    // Always hide the footer on specific pages where you don't want it to appear
    if (
      ['/about', '/albums-login', '/albums-edit', '/downloads'].includes(
        location.pathname
      )
    ) {
      offFooter(footerDispach); // Hides the footer on these routes
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/collections/:collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='/dedication' element={<Dedication />} />
      </Routes>
      <Footer />
    </>
  );
}

export default FilmRoutes;
