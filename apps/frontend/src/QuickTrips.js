import React, { useState } from "react";
import "./css/albumSet.css";
import ImageRow from "./comps/ImageRow";
import { Header } from "./comps/Header";
import { QuickTripsData } from "./data/QuickTripsData";
import { IoChevronBackOutline } from "react-icons/io5";

function QuickTrips() {
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
        <Header album="Quick Trips" />
        <p className="albumInfo">
          Embark on a visual expedition through the heart of adventure,
          capturing moments from our unforgettable road trips to destinations
          like the Jersey Shore, the vibrant streets of New York City, and the
          quaint charm of Zack's Taco Shop in the Poconos. Each photograph in
          this album tells a story of exploration and spontaneity, as we
          traverse highways and byways in search of new experiences and hidden
          gems. So buckle up and get ready to hit the road with us once again,
          as we revisit the unforgettable moments from our road trips to the
          Jersey Shore, New York City, and Zack's Taco Shop in the Poconos.
          Welcome to our Road Trips Album: A Journey of Discovery.
        </p>
      </div>
      <div className="Image-container">
        <ImageRow slides={QuickTripsData} handleImageClick={handleImageClick} />
      </div>
    </div>
  );
}

export default QuickTrips;
