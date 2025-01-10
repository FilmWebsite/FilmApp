import React from 'react';
import { useState, useEffect } from 'react';
import { usePhotos } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
import { EditAlbumCard } from '../components/EditAlbumCard';
import '../styles/Admin.scss';
import { LuSwitchCamera } from 'react-icons/lu';
import { EditCollection } from '../components/EditCollection';
import { IoCloseCircleSharp } from "react-icons/io5";

// import { CollectionSection } from './components/CollectionSection.tsx';

function AdminPage() {
  const { homePhotos, collections, getPhotosbyCID, allPhotos } = usePhotos();
  const [collectionId, setCollectionId] = useState<CollectionType>('all');
    const photos = getPhotosbyCID({ id: collectionId });
  
    const handleAlbumSelect = (albumName: any) => {
      setCollectionId(albumName);
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
              <a
                className='photoIcon'
                onClick={() => handlePhotoClick(square)}
              >
                <LuSwitchCamera />
              </a>
            </div>
        ))}
        </div>

        {isPopupVisible && selectedPhoto && (
          <div className='modal' >
            <a onClick={closePopup} className='closeIcon'><IoCloseCircleSharp /></a>
            <div className='leftSide'  onClick={(e) => e.stopPropagation()}>
              <div className='box'>
                <img
                  src={selectedPhoto.url}
                  alt='Selected Photo'
                  className='selectedImage'
                />
              </div>
              <a>
                <button className="confirmButton">Confirm</button>
              </a>
            </div>

            <div className='rightSide'  onClick={(e) => e.stopPropagation()}>
              {collectionId === 'all' &&
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
          </div>
        )}



      </div>
      

      <div>
        <h1 className='adminHeaders' style={{ color: '#ff7f50' }}>
          Edit Albums
        </h1>
        {selectedCard ? (
          <EditCollection
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ) : (
          <EditAlbumCard
            collections={collections}
            onSelectCard={setSelectedCard}
          />
        )}
      </div>

      <div className='logOutSection'>
        <p className='logOutQuestion'>Are You done?</p>
        <a href='/' className='logoutBtn'>
          Logout
        </a>
      </div>
    </div>
  );
}

// #ff7f50, #fd5e53, #f94e63, #d2386c

export default AdminPage;
