/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { FirebasePhotoMetadata, Photo } from '@film/photos-iso';
import { Skeleton } from '.';

import './styles/image-row.scss';

function ImageRow({ slides, current }: { slides: Photo[]; current: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedPic, setPickedPic] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('');
  const [newCollection, setNewCollection] = useState<string>();

  useEffect(() => {
    if (pickedPic) {
      const img = new Image();
      img.src = pickedPic;
      img.onload = () => {
        const ratio = img.height > img.width ? 'portrait' : 'landscape';
        setAspectRatio(ratio);
      };
    }
  }, [pickedPic]);

  useEffect(() => {
    console.log(newCollection);
  }, [newCollection]);

  const openModal = (index: number, image: string) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setPickedPic(image);
  };

  const totalImages = slides.length;

  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  // Handle the load event for each image
  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    // Check if all images have finished loading
    if (totalImages != 0 && loadedImagesCount === totalImages) {
      setAllImagesLoaded(true);
    }
  }, [loadedImagesCount, totalImages]);

  console.log(allImagesLoaded, 'didload');

  return (
    <div className='image-row'>
      {slides.map((slide, index) => {
        return (
          <>
            {!allImagesLoaded && <Skeleton className='h-[300px] w-[300px]' />}
            <img
              key={index}
              src={slide.url}
              className={`thumbnail ${index === 0 ? 'first-thumbnail' : ''} ${
                index === slides.length - 1 ? 'last-thumbnail' : ''
              }`}
              onClick={() => openModal(index, slide.url)}
              onLoad={handleImageLoad}
            />
          </>
        );
      })}
    </div>
  );
}

export { ImageRow };
