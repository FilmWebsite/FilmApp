import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
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
import eleven from "./pics/eleven.jpeg";
import tweleve from "./pics/tweleve.jpeg";
import thirteen from "./pics/thirteen.jpeg";
import fourteen from "./pics/fourteen.jpeg";
import fifthteen from "./pics/fifthteen.jpeg";
import sixthteen from "./pics/sixthteen.jpeg";
import "./css/ShuffleHero.css";

const ShuffleHero = () => {
  return (
    <div className="pushDown">
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-grey-900">
        <div>
          <span className="text-slate-300">DORON REID</span>
          <h3 className="sunset">FILM ALBUM</h3>
          <p className="text-left md:text-lg text-slate-300 my-4 md:my-6">
            Experience the beauty of moments frozen in time, from special
            occasions to everyday adventures. This website is a nostalgic
            journey through the personal lens of Doron, sharing the stories,
            emotions, and unique perspectives captured in each frame!
          </p>
          <button className="btn">
            <a href="/gallery">Photo Album</a>
          </button>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
};

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

export { ShuffleHero };
