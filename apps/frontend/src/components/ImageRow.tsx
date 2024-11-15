/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { FirebasePhotoMetadata, Photo } from '@film/photos-iso';
import { Skeleton } from '.';

import './styles/image-row.scss';

const callBackendRoute = async (
  collectionName: string,
  url: string,
  oldMeta: FirebasePhotoMetadata,
  current: string,
  removeFromCurrent: boolean
) => {
  try {
    const response = await fetch(`http://localhost:8080/collections/update`, {
      method: 'POST', // Changed to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: collectionName,
        url: url,
        oldMeta: oldMeta,
        current: current,
        removeFromCurrent: removeFromCurrent,
      }), // Sending body data as JSON
    });
    if (response.ok) {
    }
    // process data as needed
  } catch (error) {
    throw new Error('Failed to update check helpers');
    return [];
  } finally {
  }
};

function getMetadataByUrl(
  data: any,
  url: string
): FirebasePhotoMetadata | undefined {
  const photo = data.find((photo: Photo) => photo.url === url);

  return photo ? photo.metadata : undefined;
}

function ImageRow({ slides, current }: { slides: Photo[]; current: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedPic, setPickedPic] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('');
  const [newCollection, setNewCollection] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(e.currentTarget); // Get form data
    const inputValue = formData.get('inputField') as string; // Get the input value
    const isChecked = formData.get('collectionCheckbox') === 'on';

    const meta = getMetadataByUrl(slides, pickedPic!);
    const collection = meta;

    if (!collection) return;
    if (!pickedPic) return;

    callBackendRoute(inputValue, pickedPic, meta, current, !isChecked); // Update newCollection state
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
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
      {/* Modal for changing collection */}
      {isModalOpen && (
        <div className='modal'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <div className='popUpPic'>
            {pickedPic && (
              <>
                <img
                  src={pickedPic}
                  className={`selectedPicture ${
                    aspectRatio === 'landscape' ? 'landscape' : 'portrait'
                  }`}
                />
                <div>
                  <div className='text-white'>Change Collection</div>
                  <form className='flex-col' onSubmit={handleSubmit}>
                    <input
                      name='inputField'
                      placeholder='Enter text here'
                      className='border rounded p-2 mb-4'
                    />
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        name='collectionCheckbox'
                        className='mr-2'
                      />
                      <p className='text-white font-bold'>
                        Check to keep in this collection
                      </p>
                    </div>
                    <button
                      className='bg-white rounded-lg text-center mt-4 p-2'
                      type='submit'
                    >
                      Change
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ImageRow };
