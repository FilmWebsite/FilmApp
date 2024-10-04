import React, { useState } from 'react';
import './css/Downloads.css';
import { usePhotos } from '@film/photos-web';
import { CollectionType, Photo } from '@film/photos-iso';
import ImageDownloader from './comps/Donwloader.tsx';

function Downloads() {
  const { collections, getPhotosbyCID } = usePhotos();

  // local type
  type CollectionId = CollectionType | 'all';
  const [collectionId, setCollectionId] = useState<CollectionId>('all');
  const photos = getPhotosbyCID({ id: collectionId });

  const handleAlbumSelect = (albumName) => {
    setCollectionId(albumName);
  };

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Function to handle when a photo is clicked
  const handlePhotoClick = (pic) => {
    setSelectedPhoto(pic);
  };

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
              style={{ backgroundImage: `url(${selectedPhoto.image_url})` }}
              className='selectedImage'
            ></div>
          )}
        </div>
        <ImageDownloader selectedPhoto={selectedPhoto} />
      </div>
      <div className='rightSide'>
        {photos.map((pic) => (
          <div
            key={pic.id}
            className='picContainer'
            onClick={() => handlePhotoClick(pic)}
          >
            <div
              style={{ backgroundImage: `url(${pic.image_url})` }}
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
              {album.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Downloads;

{
  /* <div
          className="picBox"
          style={{
            backgroundImage: `url(${homePhotos[1].image_url})`,
          }}
        ></div> */
}
