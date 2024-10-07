import React, { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCameraOutline } from 'react-icons/io5';
import { usePhotos } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
import { HorizontalScrollCarousel, Loading, Skeleton } from './components';

import {
  onFooter,
  offFooter,
  useFooterDispatch,
} from './providers/FooterProvider.tsx';

import './styles/ShuffleHero.css';
import 'animate.css';
import './styles/Gallery.css';

const Landing = () => {
  const {
    collections,
    homePhotos,
    photosLoading,
    aboutMedia,
    // aboutMediaLoading,
  } = usePhotos();

  const footerDispatch = useFooterDispatch();
  const [allImagesLoaded, setAllImagesLoaded] = useState(false); // Track if all images are loaded

  useEffect(() => {
    if (photosLoading || !collections) {
      offFooter(footerDispatch); // Hide the footer if loading or no collections
    } else {
      onFooter(footerDispatch); // Show the footer after data has loaded
    }

    // Clean up on unmount: ensure footer visibility is reset
    return () => {
      onFooter(footerDispatch);
    };
  }, [photosLoading, collections, footerDispatch]);

  if (photosLoading || !collections) {
    return <Loading />;
  }

  console.log(homePhotos, 'h');

  return (
    <div className='galleryBase'>
      <div className='topScreen'>
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

          <ShuffleGrid
            squares={homePhotos}
            setAllImagesLoaded={setAllImagesLoaded}
          />
        </section>
        <div className='arrowContainer'>
          <p className='arrowDownText'>Scroll to Pick an Album</p>
          <IoIosArrowDown className='arrowDown' />
        </div>
      </div>
      <div className='containerHSC '>
        <HorizontalScrollCarousel collections={collections} />
      </div>
    </div>
  );
};

export { Landing };

// Keep SuffleGrid Here for now

type SuffleProps = {
  squares: Photo[];
  setAllImagesLoaded: (loaded: boolean) => void; // Add prop to notify when images are loaded
};

const shuffle = (array: any) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const ShuffleGrid = (props: SuffleProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(props.squares);
  const [loadedImages, setLoadedImages] = useState(0); // Count loaded images

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [props.squares]);

  const shuffleSquares = () => {
    const shuffledSquares = [...props.squares];
    shuffle(shuffledSquares);
    setSquares(shuffledSquares);

    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1); // Increment the loaded images count
  };

  // Check if all images are loaded
  const allImagesLoaded = loadedImages === squares.length;

  return (
    <div className='grid grid-cols-4 grid-rows-4 h-[450px] gap-1'>
      {squares.map((square, index) => (
        <motion.div
          key={square.metadata.firebaseStorageDownloadTokens || index} // Ensure unique key
          layout
          transition={{ duration: 1.5, type: 'spring' }}
          className='w-full h-full'
          style={{
            backgroundImage: allImagesLoaded ? `url(${square.url})` : 'none', // Show background image if loaded
            backgroundSize: 'cover',
          }}
        >
          {!allImagesLoaded && (
            <Skeleton className='w-full h-full rounded-sm' /> // Render skeleton while loading
          )}
          <img
            src={square.url}
            alt='grid item'
            onLoad={handleImageLoad} // Track when image loads
            style={{ visibility: 'hidden', position: 'absolute' }} // Hide img tag
          />
        </motion.div>
      ))}
    </div>
  );
};
