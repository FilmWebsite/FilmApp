import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { Photo } from '@film/photos-iso';

const PhotoModal = ({
  photos,
  onClose,
}: {
  photos: Photo[];
  onClose: (photoUrl: string | null) => void;
}) => {
  const handlePhotoSelect = (photoUrl: string | null) => {
    onClose(photoUrl); // Pass selected photo URL to parent
  };

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className=' p-6 rounded-md shadow-md relative w-[30%] h-[30%] overflow-auto'>
        <button
          onClick={() => onClose(null)}
          className='absolute top-2 right-2 text-black text-lg'
        >
          ✕
        </button>
        <ImageList cols={10} gap={10}>
          {photos
            .filter((photo) => !photo.metadata.home_display) // Exclude photos where homePhoto is true
            .map((photo, index) => (
              <ImageListItem
                key={index}
                onClick={() => handlePhotoSelect(photo.url)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`${photo.url}`}
                  alt={`Photo ${index}`}
                  loading='lazy'
                  style={{ borderRadius: '8px' }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </div>
    </div>
  );
};

export { PhotoModal };
