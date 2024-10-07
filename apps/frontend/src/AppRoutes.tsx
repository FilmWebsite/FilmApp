import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './comps/Footer.js';
import Gallery from './Gallery.tsx';
import About from './About.js';
import RequestPhotos from './RequestPhotos.js';
import AlbumEditLogin from './AlbumEditLogin.js';
import AlbumEdit from './AlbumEdit.js';
import { Collection } from './Collection.tsx';
import Downloads from './Downloads.tsx';
import Dedication from './Dedication.js';
import { offFooter, useFooterDispatch } from './providers/FooterProvider.tsx';

function AppRoutes() {
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

  // possibly call pics here and pass in

  return (
    <>
      <Routes>
        <Route path='/' element={<Gallery />} />
        <Route path='/collections/:collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/request-photos' element={<RequestPhotos />} />
        <Route path='/albums-login' element={<AlbumEditLogin />} />
        <Route path='/albums-edit' element={<AlbumEdit />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='/dedication' element={<Dedication />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
