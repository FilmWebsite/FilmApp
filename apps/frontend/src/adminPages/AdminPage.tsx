import React from 'react';
import { useState, useEffect } from 'react';
import { usePhotos } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
import { EditAlbumCard } from '../components/EditAlbumCard';
import '../styles/Admin.scss';
import { LuSwitchCamera } from 'react-icons/lu';
import { EditCollection } from '../components/EditCollection';
// import { CollectionSection } from './components/CollectionSection.tsx';

function AdminPage() {
  const { homePhotos, collections } = usePhotos();

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
        <div className='modal' onClick={closePopup}>
        <div className='box' onClick={(e) => e.stopPropagation()}>
          <button className='closeButton' onClick={closePopup}>&times;</button>
          <img
            src={selectedPhoto.url}
            alt='Selected Photo'
            className='popupPhoto'
          />
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
