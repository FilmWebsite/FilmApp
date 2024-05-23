import React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import one from "../pics/one.jpeg";
import nineteen from "../pics/nineteen.jpg";
import eighteen from "../pics/eighteen.jpg";

const InCard = () => {
  return (
    <div>
      <TiltCard />
    </div>
  );
};

const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [imageIndex, setImageIndex] = useState(0);
  const images = [one, nineteen, eighteen]; // Add more image URLs as needed

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the image index to the next one in the array
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 1000 milliseconds (1 second)

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [images]); // Re-run the effect when the images array changes

  const currentImage = images[imageIndex];

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover", // Adjust as needed
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      ></div>
    </motion.div>
  );
};

export default InCard;
