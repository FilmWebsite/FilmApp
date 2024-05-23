import React, { useEffect, useState, useRef } from "react";
import "./css/Gallery.css";
import fourteen from "./pics/fourteen.jpeg";
import thirtythree from "./pics/thirtythree.jpeg";
import eleven from "./pics/eleven.jpeg";
import seventeen from "./pics/seventeen.JPG";
import twenty from "./pics/twenty.JPG";
import twentyone from "./pics/twentyone.jpg";
import BI from "./data/BI.jpeg";

import { motion, useTransform, useScroll } from "framer-motion";
import InCard from "./comps/InCard";
import "animate.css";
import { IoIosArrowRoundBack, IoIosArrowDown } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import one from "./pics/one.jpeg";
import two from "./pics/two.jpeg";
import three from "./pics/three.jpeg";
import four from "./pics/four.jpeg";
import five from "./pics/five.jpeg";
import six from "./pics/six.jpeg";
import seven from "./pics/seven.jpeg";
import eight from "./pics/eight.jpeg";
import nine from "./pics/nine.jpeg";
import ten from "./pics/ten.jpeg";
import tweleve from "./pics/tweleve.jpeg";
import thirteen from "./pics/thirteen.jpeg";
import fifthteen from "./pics/fifthteen.jpeg";
import sixthteen from "./pics/sixthteen.jpeg";
import "./css/ShuffleHero.css";

const Gallery = () => {
  return (
    <div className="galleryBase">
      <div className="topScreen">
        <div className="header">
          {/* <div className="titleBox">
            <IoCameraOutline className="rotatedIcon" />
            <p className="title">ddot studio</p>
          </div> */}
          {/* <a href="/request-photo" className="requestPhoto">
            Request Photo
          </a> */}
        </div>

        <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-grey-900">
          <div>
            {/* <span className="text-slate-300">DORON REID</span> */}
            <div className="titleBox">
              <IoCameraOutline className="rotatedIcon" />
              <p className="title">ddot studio</p>
            </div>
            <p className="text-left md:text-lg text-slate-300 my-4 md:my-6">
              Experience the beauty of moments frozen in time, from special
              occasions to everyday adventures. This website is a nostalgic
              journey through the personal lens of Doron, sharing the stories,
              emotions, and unique perspectives captured in each frame!
            </p>
          </div>
          <ShuffleGrid />
        </section>

        <div className="arrowContainer">
          <p className="arrowDownText">Scroll to Pick an Album</p>
          <IoIosArrowDown className="arrowDown" />
        </div>
      </div>
      <div className="containerHSC ">
        <HorizontalScrollCarousel />
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-40%"]);

  return (
    <div>
      <section ref={targetRef} className="relative h-[250vh] ">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 mt-[-80px]">
            {cards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <a href={card.link} className="group">
      <div
        key={card.id}
        className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p className="cardtitle">{card.title}</p>
        </div>
      </div>
    </a>
  );
};

export default Gallery;

const cards = [
  {
    url: fourteen,
    title: "NYC",
    id: 1,
    link: "/nyc",
  },
  {
    url: thirtythree,
    title: "Howard",
    id: 2,
    link: "/howard",
  },
  {
    url: twenty,
    title: "Grenada",
    id: 3,
    link: "/grenada",
  },
  {
    url: twentyone,
    title: "Landmarks",
    id: 4,
    link: "/landmarks",
  },
  {
    url: seventeen,
    title: "Quick Trips",
    id: 5,
    link: "/quick-trips",
  },
];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: one,
  },
  {
    id: 2,
    src: two,
  },
  {
    id: 3,
    src: three,
  },
  {
    id: 4,
    src: four,
  },
  {
    id: 5,
    src: five,
  },
  {
    id: 6,
    src: six,
  },
  {
    id: 7,
    src: seven,
  },
  {
    id: 8,
    src: eight,
  },
  {
    id: 9,
    src: nine,
  },
  {
    id: 10,
    src: ten,
  },
  {
    id: 11,
    src: eleven,
  },
  {
    id: 12,
    src: tweleve,
  },
  {
    id: 13,
    src: thirteen,
  },
  {
    id: 14,
    src: fourteen,
  },
  {
    id: 15,
    src: fifthteen,
  },
  {
    id: 16,
    src: sixthteen,
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="a-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(0);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};