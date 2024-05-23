// Grenada
import React, { useState } from "react";
import "./css/albumSet.css";
import ImageRow from "./comps/ImageRow";
import { Header } from "./comps/Header";
import { GrenadaData } from "./data/GrenadaData";
import { IoChevronBackOutline } from "react-icons/io5";

function Grenada() {
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
        <Header album="Grenada" />
        <p className="albumInfo">
          A Journey Back to Roots. Embark on a visual exploration of my recent
          trip to my mother's homeland, Grenada, captured in December of 2023.
          Each photograph in this album serves as a memoir of my third visit to
          this beautiful country, brimming with rich culture and unforgettable
          experiences. From the tranquil shores to the lush landscapes, this
          album chronicles the moments spent reconnecting with family, embracing
          local traditions, and immersing myself in the vibrant tapestry of
          Grenadian life. Join me as we traverse through the enchanting streets,
          iconic landmarks, and cherished memories of Grenada. Together, let's
          embark on a journey of discovery, where every photograph tells a story
          and every moment is etched in the heart.
        </p>
      </div>
      <div className="Image-container">
        <ImageRow slides={GrenadaData} handleImageClick={handleImageClick} />
      </div>
    </div>
  );
}

export default Grenada;
