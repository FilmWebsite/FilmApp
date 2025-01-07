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

function EditImageRow({ slides, current }: { slides: Photo[]; current: string }) {
  

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
              onLoad={handleImageLoad}
            />
          </>
        );
      })}
      {/* Modal for changing collection */}
      
    </div>
  );
}

export { EditImageRow };
