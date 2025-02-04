import { useState } from 'react';
import { usePhotos, useAdminTools } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
import { EditAlbumCard } from '../components/EditAlbumCard';
import { LuSwitchCamera } from 'react-icons/lu';
import { EditCollection } from '../components/EditCollection';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { Skeleton } from '../components';
import { useNavigate } from 'react-router-dom';

import '../styles/Admin.scss';

function AdminPage() {
  type ImageLoadStatus = Record<string, boolean>;
  const [imageLoadStatus, setImageLoadStatus] = useState<ImageLoadStatus>({});

  const navigate = useNavigate();

  const handleImageLoad = (id: string) => {
    setImageLoadStatus((prevStatus) => ({
      ...prevStatus,
      [id]: true, // Mark the image as loaded
    }));
  };

  const { homePhotos, collections, getPhotosbyCID, allPhotos } = usePhotos();
  const [collectionId] = useState<CollectionType>('all');

  const photos = getPhotosbyCID({ id: 'all' });

  const { swapHomeDisplay } = useAdminTools();
  const [newPhoto, setNewPhoto] = useState<Photo | null>(null);
  const handleNewPhotoClick = (photo: Photo) => {
    setNewPhoto(photo);
  };

  const [selectedCard, setSelectedCard] = useState<Collection | null>(null);

  //For the shuffle pictures
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedPhoto(null);
  };

  const handleSwapFinal = async ({
    oldUrl,
    newUrl,
  }: {
    oldUrl: string;
    newUrl: string;
  }) => {
    await swapHomeDisplay({
      oldUrl: oldUrl,
      newUrl: newUrl,
    });
    closePopup();
    window.location.reload(); // Refresh the page after the action
  };

  const routeToAdminCollectionEdit = (card: Collection) => {
    navigate(`/admin/collection/${card.ref}`, { state: { card } });
  };

  return (
    <div className='adminBackground'>
      <div>
        <h1 className='adminHeaders' style={{ color: '#f94e63' }}>
          Shuffle Pictures
        </h1>

        <div className='homePhotos'>
          {homePhotos.map((square, index) => (
            <div key={index} className='photoContainer'>
              <img
                src={square.url}
                alt={`Photo ${index}`}
                className='homePhoto'
              />
              <a className='photoIcon' onClick={() => handlePhotoClick(square)}>
                <LuSwitchCamera />
              </a>
            </div>
          ))}
        </div>

        {isPopupVisible && selectedPhoto && (
          <div className='modal'>
            <a onClick={closePopup} className='closeIcon'>
              <IoCloseCircleSharp />
            </a>
            <div className='leftSide' onClick={(e) => e.stopPropagation()}>
              <div className='box'>
                <img
                  src={selectedPhoto.url}
                  alt='Selected Photo'
                  className='selectedImage'
                />
              </div>
            </div>

            {!newPhoto && (
              <div className='rightSide' onClick={(e) => e.stopPropagation()}>
                {collectionId === 'all' &&
                  allPhotos.map((pic) => (
                    <div
                      className='picContainer'
                      onClick={() => handleNewPhotoClick(pic)}
                    >
                      {/* Render Skeleton only if the image is not loaded */}
                      {!imageLoadStatus[
                        pic.metadata.firebaseStorageDownloadTokens
                      ] && <Skeleton className='w-full h-full rounded-sm' />}
                      <img
                        src={pic.url}
                        alt='Image'
                        style={{
                          display: imageLoadStatus[
                            pic.metadata.firebaseStorageDownloadTokens
                          ]
                            ? ''
                            : 'none', // Hide until loaded
                        }}
                        onLoad={() =>
                          handleImageLoad(
                            pic.metadata.firebaseStorageDownloadTokens
                          )
                        }
                        className='picImage'
                      />
                    </div>
                  ))}
              </div>
            )}
            {newPhoto && (
              <div className='' onClick={(e) => e.stopPropagation()}>
                <div className='box'>
                  <img
                    src={newPhoto.url}
                    alt='Selected Photo'
                    className='selectedImage'
                  />
                </div>
                <a>
                  {selectedPhoto && newPhoto && (
                    <button
                      className='confirmButton'
                      onClick={() => setNewPhoto(null)}
                    >
                      Back
                    </button>
                  )}
                </a>
                <a>
                  {selectedPhoto && newPhoto && (
                    <button
                      className='confirmButton'
                      onClick={async () =>
                        handleSwapFinal({
                          oldUrl: selectedPhoto.url,
                          newUrl: newPhoto.url,
                        })
                      }
                    >
                      Confirm
                    </button>
                  )}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <h1 className='adminHeaders' style={{ color: '#ff7f50' }}>
          Edit Albums
        </h1>
        <EditAlbumCard
          collections={collections}
          onSelectCard={routeToAdminCollectionEdit}
        />
      </div>
    </div>
  );
}

// #ff7f50, #fd5e53, #f94e63, #d2386c

export default AdminPage;
