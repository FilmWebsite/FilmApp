import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './comps/Footer';
import ShuffleHero from './ShuffleHero';
import Gallery from './Gallery.tsx';
import NYC from './NYC';
import Howard from './Howard';
import Grenada from './Grenada';
import QuickTrips from './QuickTrips';
import Landmarks from './Landmarks';
import About from './About';
import RequestPhotos from './RequestPhotos';

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<ShuffleHero />} /> */}
        <Route path='/' element={<Gallery />} />
        <Route path='/nyc' element={<NYC />} />
        <Route path='/howard' element={<Howard />} />
        <Route path='/grenada' element={<Grenada />} />
        <Route path='/quick-trips' element={<QuickTrips />} />
        <Route path='/landmarks' element={<Landmarks />} />
        <Route path='/about' element={<About />} />
        <Route path='/request-photos' element={<RequestPhotos />} />
      </Routes>
      {/* Render the Footer component only if the current path is not "/about" */}
      {location.pathname !== '/about' && <Footer />}
    </>
  );
}

export default AppRoutes;
