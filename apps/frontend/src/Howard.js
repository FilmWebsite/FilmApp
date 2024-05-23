import React, { useState } from "react";
import "./css/albumSet.css";
import ImageRow from "./comps/ImageRow";
import { Header } from "./comps/Header";
import { HowardData } from "./data/HowardData";
import { IoChevronBackOutline } from "react-icons/io5";

function Howard() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="nyc-container">
      <a href="/">
        <IoChevronBackOutline class="icon" />
      </a>

      <div className="info-container">
        <Header album="Howard University" />
        <p className="albumInfo">
          Welcome to our Howard University Album: A Journey Through Time. Embark
          on a visual exploration spanning from my sophomore year to the present
          day. Each picture holds a piece of the story, capturing the essence of
          my journey through Howard University. From the bustling campus life to
          the moments of quiet reflection, this album offers a glimpse into the
          heart of my university experience. Let these pictures take you on a
          journey through the vibrant campus life, iconic landmarks, and
          unforgettable moments that have made my time at Howard University
          truly unforgettable.
        </p>
      </div>
      <div className="Image-container">
        <ImageRow slides={HowardData} handleImageClick={handleImageClick} />
      </div>
    </div>
  );
}

export default Howard;
