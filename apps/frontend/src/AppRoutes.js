import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './comps/Footer';
import Gallery from './Gallery.tsx';
import About from './About';
import RequestPhotos from './RequestPhotos';
import AlbumEditLogin from './AlbumEditLogin.js';
import AlbumEdit from './AlbumEdit.js';
import { Collection } from './Collection.tsx';
import Downloads from './Downloads.tsx';
import Dedication from './Dedication.js';
import { useFooterState } from './providers/FooterProvider.tsx';
// import Loading from './comps/Loading.ts';

function AppRoutes() {
  const location = useLocation();

  const { showFooter } = useFooterState();

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
      {/* Fix loading dont show */}
      {showFooter &&
        !['/about', '/albums-login', '/albums-edit', '/downloads'].includes(
          location.pathname
        ) && <Footer />}
    </>
  );
}

export default AppRoutes;
