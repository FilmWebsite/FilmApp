import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './comps/Footer';
import Gallery from './Gallery.tsx';
import About from './About';
import RequestPhotos from './RequestPhotos';
import AlbumEditLogin from './AlbumEditLogin.js';
import AlbumEdit from './AlbumEdit.js';
import { Collection } from './Collection.tsx';
import Downloads from './Downloads.tsx';
import { FindMe } from './findme/index.tsx';
import { FindMeResults } from './findme/results.tsx';

function AppRoutes() {
  const location = useLocation();

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
        <Route path='/detection' element={<FindMe />} />
        <Route path='/detection/results' element={<FindMeResults />} />
      </Routes>
      {location.pathname !== '/about' &&
        location.pathname !== '/albums-login' &&
        location.pathname !== '/albums-edit' &&
        location.pathname !== '/page' && <Footer />}
    </>
  );
}

export default AppRoutes;
