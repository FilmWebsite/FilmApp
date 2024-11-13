import { useState } from 'react';
import { usePhotos } from '@film/photos-web';
import { CollectionType, Photo } from '@film/photos-iso';
import { ImageDownloader } from './components';

import './styles/Downloads.scss';

// TODO: if we no longer have a selctedImage then reomve

function Downloads() {
  const { collections, getPhotosbyCID, allPhotos } = usePhotos();
  // local type
  const [collectionId, setCollectionId] = useState<CollectionType | 'none'>(
    'none'
  );
  const photos = getPhotosbyCID({ id: collectionId });

  const handleAlbumSelect = (albumName: any) => {
    setCollectionId(albumName);
    setSelectedPhoto(undefined); // Reset selected photo when album changes
  };

  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();
  const [selectMutiple, setSelectMutiple] = useState<boolean>(false);

  const handleMutipleCheckbox = (event: any) => {
    setSelectMutiple(event.target.checked);
  };

  const [selectedImages, setSelectedImages] = useState<Photo['url'][]>([]);

  // Function to handle when a photo is clicked
  const handlePhotoClick = (pic: Photo, type: 'single' | 'multiple') => {
    if (type == 'single') {
      setSelectedPhoto(pic);
    } else if (type === 'multiple') {
      setSelectedImages([...selectedImages, pic.url]);
    }
  };

  if (!collections) return;

  return (
    <div className='downloadsPage'>
      {selectMutiple && <div className='banner'>Multiple Selection On</div>}
      <div className='leftSide'>
        <h1 className='downloadHeader'>Downloads</h1>
        <p className='downloadDesc'>
          Easily download any pictures you've seen on the website. Simply browse
          through the gallery, select a picture, and download.
        </p>

        <div className={`box ${selectMutiple ? 'multiple' : 'non-multiple'}`}>
          {selectedPhoto && !selectMutiple && (
            <div
              style={{ backgroundImage: `url(${selectedPhoto.url})` }}
              className='selectedImage'
            ></div>
          )}
          {collectionId == 'none' && (
            <p className='dropdown-desc'>
              To begin, select an album from the dropdown menu on the right.
            </p>
          )}

          {selectMutiple &&
            selectedImages.map((image, index) => (
              <div className='image-item' key={index}>
                <img src={image} />
              </div>
            ))}
        </div>

        <ImageDownloader
          content={selectMutiple ? selectedImages : selectedPhoto}
          type={selectMutiple ? 'multiple' : 'single'}
        />
      </div>
      <div className='rightSide'>
        {collectionId != 'all' &&
          photos.map((pic) => (
            <div
              // key={pic.id}
              className='picContainer'
              onClick={() =>
                handlePhotoClick(pic, selectMutiple ? 'multiple' : 'single')
              }
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
              onClick={() =>
                handlePhotoClick(pic, selectMutiple ? 'multiple' : 'single')
              }
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
          <option value='none'></option>
          <option value='all'>All Albums</option>

          {collections.map((album) => (
            <option key={album.id} value={album.ref}>
              {album.display_name || album.card_name}
            </option>
          ))}
        </select>
        {collectionId != 'none' && (
          <div className='select-multi'>
            <input
              type='checkbox'
              id='checkbox1'
              checked={selectMutiple}
              onChange={handleMutipleCheckbox}
            />
            <label htmlFor='checkbox1' className='muti-desc'>
              Check to Select Mutiple Photos
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Downloads;
