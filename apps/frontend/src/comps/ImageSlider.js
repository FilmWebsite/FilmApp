import React, { useState, useEffect } from "react";
import { SliderData } from "../data/NYCData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { motion, useTransform, useScroll } from "framer-motion";

const ImageSlider = ({ slides }) => {
  const [imageDimensions, setImageDimensions] = useState([]);

  useEffect(() => {
    const getDimensions = async () => {
      const dimensions = await Promise.all(
        SliderData.map((slide) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = slide.image;
            img.onload = () => {
              console.log("Before", slide.title, img.width, img.height);
              let adjustedWidth = img.width;
              let adjustedHeight = img.height;

              if (img.width > img.height) {
                if (img.height > 850) {
                  if (img.height > 1000) {
                    adjustedWidth = 680;
                  } else {
                    adjustedWidth = 620;
                  }
                } else {
                  adjustedWidth = 720;
                }
              } else if (img.width < img.height) {
                if (img.height > 1000) {
                  adjustedWidth = 410;
                } else {
                  adjustedWidth = 490;
                }
              } else {
                adjustedWidth = 580;
              }

              console.log(
                "Adjusted",
                slide.title,
                adjustedWidth,
                adjustedHeight
              );
              resolve({ width: adjustedWidth, height: adjustedHeight });
            };
          });
        })
      );
      setImageDimensions(dimensions);
    };

    getDimensions();
  }, []);

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <motion.section
      className="slider"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div className="picTitle">
                <img
                  src={slide.image}
                  alt="travel image"
                  className="image"
                  width={imageDimensions[index]?.width}
                  height={imageDimensions[index]?.height}
                />
                <div className="title-date-overlay">
                  <span className="title-date">{slide.time} </span>
                </div>
                <div className="title-overlay">
                  <span className="title-text">{slide.title}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </motion.section>
  );
};

export default ImageSlider;
