import React, { useEffect, useState, useRef, useMemo } from 'react';
import './css/Gallery.css';

import { motion, useTransform, useScroll } from 'framer-motion';
import InCard from './comps/InCard';
import 'animate.css';
import { IoIosArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
import { IoCameraOutline } from 'react-icons/io5';

import './css/ShuffleHero.css';
import { usePhotos } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
import { ImageC } from './ImageC.tsx';

const Gallery = () => {
  const { collections, homePhotos, photosLoading } = usePhotos();

  if (photosLoading) return;

  if (!collections) return;

  return (
    <div className='galleryBase'>
      <div className='topScreen'>
        <div className='header'>
          {/* <div className="titleBox">
            <IoCameraOutline className="rotatedIcon" />
            <p className="title">ddot studio</p>
          </div> */}
          {/* <a href="/request-photo" className="requestPhoto">
            Request Photo
          </a> */}
        </div>

        <section className='w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-grey-900'>
          <div>
            {/* <span className="text-slate-300">DORON REID</span> */}
            <div className='titleBox'>
              <IoCameraOutline className='rotatedIcon' />
              <p className='title'>ddot studio</p>
            </div>
            <p className='text-left md:text-lg text-slate-300 my-4 md:my-6'>
              Experience the beauty of moments frozen in time, from special
              occasions to everyday adventures. This website is a nostalgic
              journey through the personal lens of Doron, sharing the stories,
              emotions, and unique perspectives captured in each frame!
            </p>
          </div>
          <ShuffleGrid squares={homePhotos} />
        </section>

        <div className='arrowContainer'>
          <p className='arrowDownText'>Scroll to Pick an Album</p>
          <IoIosArrowDown className='arrowDown' />
        </div>
      </div>
      <div className='containerHSC '>
        {/* @ts-ignore */}
        <HorizontalScrollCarousel collections={collections} />
      </div>
    </div>
  );
};

type ScrollProps = {
  collections: any[];
};

const HorizontalScrollCarousel = (props: ScrollProps) => {
  const targetRef = useRef(null);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [dynamicOffset, setDynamicOffset] = useState('-2%');
  const [scrollLimit, setScrollLimit] = useState('-2%');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = scrollContainerRef.current
        ? scrollContainerRef.current.scrollWidth
        : 0;
      const calculatedOffset = screenWidth > 1200 ? '-100%' : '-80%';
      setDynamicOffset(calculatedOffset);

      // Calculate how much to scroll based on container width and screen width
      const limit = screenWidth - containerWidth;
      setScrollLimit(`${limit}px`);
    };

    // Initial calculation
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [props.collections]);

  // Adjust scroll end point using scrollLimit
  const x = useTransform(scrollYProgress, [0, 1], ['1%', scrollLimit]);

  return (
    <div>
      <section ref={targetRef} className='relative h-[250vh]'>
        <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
          <motion.div
            // @ts-ignore
            ref={scrollContainerRef}
            style={{ x }}
            className='flex gap-4 mt-[-80px]'
          >
            {props.collections.map((card) => {
              return <CollectionCard key={card.id} card={card} />;
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const CollectionCard = ({ card }: { card: Collection }) => {
  return (
    // FIXME: Refer to frontend bug as some pics render
    <a href={`/collections/${card.ref}`} className='group'>
      <div className='group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200'>
        {/* Use img tag for better debugging */}
        <img
          src={card.cover_image}
          alt={card.card_name}
          className='absolute inset-0 z-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
          onError={(e) => {
            // Handle image load error (fallback)
            e.currentTarget.src = '/path/to/fallback-image.jpg';
          }}
        />
        <div className='absolute inset-0 z-10 grid place-content-center'>
          <p className='cardtitle'>{card.card_name}</p>
        </div>
      </div>
    </a>
  );
};

export default Gallery;

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

const generateSquares = (data) => {
  // console.log(data, 'from cop');
  return shuffle(data).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className='a-full h-full'
      style={{
        backgroundImage: `url(${sq.url})`,
        backgroundSize: 'cover',
      }}
    ></motion.div>
  ));
};

type SuffleProps = {
  squares: Photo[];
};

const ShuffleGrid = (props: SuffleProps) => {
  const timeoutRef = useRef(0);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, [props.squares]);

  const shuffleSquares = () => {
    setSquares(generateSquares(props.squares));
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className='grid grid-cols-4 grid-rows-4 h-[450px] gap-1'>
      {squares}
    </div>
  );
};
