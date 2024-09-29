import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./comps/Footer";
import Gallery from "./Gallery.tsx";
import About from "./About";
import RequestPhotos from "./RequestPhotos";
import AlbumEditLogin from "./AlbumEditLogin.js";
import AlbumEdit from "./AlbumEdit.js";
import { Collection } from "./Collection.tsx";
import Downloads from "./Downloads.tsx";
import Dedication from "./Dedication.js";
import Loading from "./comps/Loading.js";

function AppRoutes() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [location]);

  if (loading) {
    return <Loading />; // Show loading screen while loading
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/collections/:collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/request-photos" element={<RequestPhotos />} />
        <Route path="/albums-login" element={<AlbumEditLogin />} />
        <Route path="/albums-edit" element={<AlbumEdit />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/dedication" element={<Dedication />} />
      </Routes>
      {!["/about", "/albums-login", "/albums-edit", "/downloads"].includes(
        location.pathname
      ) && <Footer />}
    </>
  );
}

export default AppRoutes;
