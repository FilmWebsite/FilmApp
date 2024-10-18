import React, { useState } from 'react';
import { usePhotos } from '@film/photos-web';
import { CollectionType, Photo } from '@film/photos-iso';
import { ImageDownloader } from './components';

import './styles/Downloads.scss';

function Downloads() {
  const { collections, getPhotosbyCID, allPhotos } = usePhotos();
  // local type
  const [collectionId, setCollectionId] = useState<CollectionType>('all');
  const photos = getPhotosbyCID({ id: collectionId });

  const handleAlbumSelect = (albumName: any) => {
    setCollectionId(albumName);
  };

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Function to handle when a photo is clicked
  const handlePhotoClick = (pic: any) => {
    setSelectedPhoto(pic);
  };

  if (!collections) return;

  return (
    <div className='downloadsPage'>
      <div className='leftSide'>
        <h1 className='downloadHeader'>Downloads</h1>
        <p className='downloadDesc'>
          Easily download any pictures you've seen on the website. Simply browse
          through the gallery, select a picture, and download.
        </p>

        <div className='box'>
          {selectedPhoto && (
            <div
              style={{ backgroundImage: `url(${selectedPhoto.url})` }}
              className='selectedImage'
            ></div>
          )}
        </div>
        <ImageDownloader selectedPhoto={selectedPhoto} />
      </div>
      <div className='rightSide'>
        {collectionId != 'all' &&
          photos.map((pic) => (
            <div
              // key={pic.id}
              className='picContainer'
              onClick={() => handlePhotoClick(pic)}
            >
              <div
                style={{ backgroundImage: `url(${pic.url})` }}
                className='picImage'
              ></div>
            </div>
          ))}

        {collectionId == 'all' &&
          allPhotos.map((pic) => (
            <div
              // key={pic.id}
              className='picContainer'
              onClick={() => handlePhotoClick(pic)}
            >
              <div
                style={{ backgroundImage: `url(${pic.url})` }}
                className='picImage'
              ></div>
            </div>
          ))}
      </div>
      <div className='dropdown'>
        <select
          value={collectionId}
          onChange={(e) => {
            handleAlbumSelect(e.target.value);
          }}
        >
          <option value='all'>All Albums</option>
          {collections.map((album) => (
            <option key={album.id} value={album.ref}>
              {album.display_name || album.card_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Downloads;
