import React, { useState } from "react";
// import ImageSlider from "./comps/ImageSlider";
// import Footer from "./comps/Footer";
import "./css/albumSet.css";
import ImageRow from "./comps/ImageRow";
import { Header } from "./comps/Header";
import { SliderData } from "./data/NYCData";
import { IoChevronBackOutline } from "react-icons/io5";

function NYC() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // const handleCloseImageSlider = () => {
  //   setSelectedImage(null);
  // };

  return (
    <div className="nyc-container">
      <a href="/">
        <IoChevronBackOutline class="icon" />
      </a>
      <div className="info-container">
        <Header album="New York City" />
        <p className="albumInfo">
          Welcome to our NYC Album: A Chronicle of Home. Explore a visual
          journey through the vibrant streets, iconic landmarks, and cherished
          moments captured within the bustling cityscape of New York City. Each
          photo encapsulates the essence of my 21-year journey, offering a
          glimpse into the heart of the city I call home. Join me as we stroll
          through the familiar sights and hidden gems that have shaped my life
          and experiences in this dynamic metropolis.
        </p>
      </div>
      <div className="Image-container">
        <ImageRow slides={SliderData} handleImageClick={handleImageClick} />
      </div>
    </div>
  );
}

export default NYC;
