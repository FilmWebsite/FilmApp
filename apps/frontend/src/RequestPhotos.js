import React, { useState } from "react";
import "./css/RequestPhotos.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import huTwenty from "./howardPics/huTwenty.JPG";
import five from "./pics/five.jpeg";
import twentynine from "./pics/twentynine.jpeg";
import DigitalRequest from "./comps/DigitalRequest";
import PhysicalRequest from "./comps/PhysicalRequest";
import BothRequest from "./comps/BothRequest";

function RequestPhotos() {
  const headings = [
    "Request Digital Copies",
    "Request Physical Copies",
    "Both",
  ];
  const photos = [twentynine, huTwenty, five];
  const [picture, setPicture] = useState(twentynine);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length);
  };

  const handleBack = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + headings.length) % headings.length
    );
  };

  return (
    <div className="requestPage">
      <a href="/">
        <IoChevronBackOutline className="requestBack" />
      </a>
      <div className="requestBox">
        <div className="heading">
          <button onClick={handleBack} className="headerBack">
            <IoChevronBackCircleSharp />
          </button>
          <h1 className="nameOfPage">{headings[currentIndex]}</h1>
          <button onClick={handleNext} className="headerForward">
            <IoChevronBackCircleSharp />
          </button>
        </div>

        {headings[currentIndex] === "Request Digital Copies" && (
          <DigitalRequest />
        )}

        {headings[currentIndex] === "Request Physical Copies" && (
          <PhysicalRequest />
        )}

        {headings[currentIndex] === "Both" && <BothRequest />}
      </div>
      <div
        className="requestPicture"
        style={{ backgroundImage: `url(${photos[currentIndex]})` }}
      />
    </div>
  );
}

export default RequestPhotos;

{
  /* Content of the page */
}
{
  /* For the dark overlay */
}
{
  /* <div className="overlay">
        <div className="requestBox">
          <h1>Full Name:</h1>
          <h1>Requested Pictures:</h1>
          <h1>How do you want the pictures sent:</h1>
          <h1>Digital/Physical/Both</h1>
          <h1>Email:</h1>
          <h1>Phone Number:</h1>
          <h1>Address:</h1>
          <h1>Size of Pictures:</h1>
        </div>
      </div> */
}
