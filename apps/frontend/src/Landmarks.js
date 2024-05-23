import React, { useState } from "react";
import "./css/albumSet.css";
import ImageRow from "./comps/ImageRow";
import { Header } from "./comps/Header";
import { LandMarksData } from "./data/LandMarksData";
import { IoChevronBackOutline } from "react-icons/io5";

function Landmarks() {
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
        <Header album="Land Marks" />
        <p className="albumInfo">
          Welcome to our Landmarks Album: A Tapestry of Treasured Sites. Step
          into a visual odyssey through a diverse array of iconic landmarks,
          spanning from the bustling streets of New York City to the serene
          landscapes of Rock Creek Park in Washington, D.C. This album offers a
          curated collection of snapshots, each capturing the essence and allure
          of these renowned destinations. From the towering skyscrapers of
          Manhattan to the historic monuments of the nation's capital, join me
          on a journey through time and space as we explore these cherished
          sites. Whether it's the vibrant energy of Times Square or the tranquil
          trails of Rock Creek Park, each photograph tells a unique story,
          inviting you to immerse yourself in the rich tapestry of human history
          and natural beauty.
        </p>
      </div>
      <div className="Image-container">
        <ImageRow slides={LandMarksData} handleImageClick={handleImageClick} />
      </div>
    </div>
  );
}

export default Landmarks;
