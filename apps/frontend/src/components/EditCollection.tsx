import React, { useState, useEffect } from 'react';
import { Collection } from '@film/photos-iso';
import {
  usePhotos,
  useAdminTools,
  useAdminCollectionForm,
} from '@film/photos-web';
import { LuSwitchCamera } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { FaPhotoFilm } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';

import '../styles/Admin.scss';

type EditCollectionProps = {
  selectedCard: Collection;
  setSelectedCard: React.Dispatch<React.SetStateAction<Collection | null>>;
};

const EditCollection = ({
  selectedCard,
  setSelectedCard,
}: EditCollectionProps) => {
  const { getPhotosbyCID } = usePhotos();
  const { collectionCoverChange } = useAdminTools();

  const photos = getPhotosbyCID({ id: selectedCard.id });
  const { handleFormChange, submitCollectionEdit, isEdited } =
    useAdminCollectionForm(selectedCard);

  const handleCoverImageClick = (event: any) => {
    const file: File = event.target.files[0];
    if (file) {
      collectionCoverChange(file, selectedCard.ref);
    }
  };

  const handleIconClick = () => {
    // @ts-ignore
    document.getElementById('fileInput').click();
  };
  return (
    <div>
      <a onClick={() => setSelectedCard(null)}>Back</a>
      <form className='albumInfoForm'>
        <div className='selectedTop'>
          <div className='selectedAlbumImg'>
            <div className='relative h-[350px] w-full max-w-[350px] overflow-hidden cursor-pointer'>
              <img
                src={selectedCard.cover_image}
                alt={selectedCard.card_name}
                className='photoImage'
                onError={(e) => {
                  e.currentTarget.src = '/path/to/fallback-image.jpg';
                }}
              />
            </div>
            <div>
              <LuSwitchCamera
                className='selectedAlbumIcon'
                onClick={handleIconClick} // Triggers the file input click
              />
              <input
                id='fileInput'
                type='file'
                accept='image/*'
                style={{ display: 'none' }} // Hidden input
                onChange={handleCoverImageClick} // Handles file selection
              />
            </div>
          </div>
          <div className='selectedTopInfo'>
            <div className='selectedAlbumName'>
              <span>
                <p className='inputHeader'>Album Name</p>
                <input
                  type='text'
                  name='card_name'
                  className='editBox'
                  onChange={(e) =>
                    handleFormChange('card_name', e.target.value)
                  }
                  placeholder={selectedCard.card_name}
                />
              </span>

              {isEdited && (
                <button
                  type='submit'
                  className={`submitButton ${isEdited ? 'hoverEnabled' : ''}`}
                  disabled={!isEdited}
                  onClick={(e) => {
                    e.preventDefault();
                    submitCollectionEdit();
                  }}
                >
                  Save Changes
                </button>
              )}
            </div>
            <div className='selectedHeaders'>
              <span>
                <p className='inputHeader'>Text Color</p>
                <input
                  type='text'
                  name='textColor'
                  className='editBox'
                  onChange={(e) =>
                    handleFormChange('text_color', e.target.value)
                  }
                  placeholder={selectedCard.colors.textColor}
                />
              </span>
              <span>
                <p className='inputHeader'>Shadow Color</p>
                <input
                  type='text'
                  name='shadowColor'
                  className='editBox'
                  placeholder={selectedCard.colors.shadowColor}
                  onChange={(e) =>
                    handleFormChange('shadow_color', e.target.value)
                  }
                />
              </span>
            </div>
            <div className='selectedHeaders'>
              <span>
                <p className='inputHeader'>Display Name</p>
                <input
                  type='text'
                  name='display_name'
                  className='editBox'
                  placeholder={
                    selectedCard.display_name
                      ? selectedCard.display_name
                      : 'null'
                  }
                  onChange={(e) =>
                    handleFormChange('display_name', e.target.value)
                  }
                />
              </span>
              <span>
                <p className='inputHeader'>Ref</p>
                <input
                  type='text'
                  name='ref'
                  className='editBox'
                  placeholder='Contact Backend Team for ref change'
                  disabled={true}
                />
              </span>
            </div>
            <p className='inputHeader'>Description</p>
            <textarea
              name='desc'
              className='editDesc'
              onChange={(e) => handleFormChange('desc', e.target.value)}
              placeholder='Enter description'
            />
          </div>
        </div>
      </form>

      <div className='photoGrid'>
        {photos.map((pics, index) => (
          <div key={index} className='photoSection'>
            <div
              key={index}
              className='relative h-[300px] w-full max-w-[300px] overflow-hidden'
            >
              <img
                src={pics.url}
                alt='grid item'
                className='collectionPhotos'
              />
            </div>
            <div className='photoOptions'>
              <FaPhotoFilm className='photoSwitch' />
              <MdDelete className='photoDelete' />
            </div>
          </div>
        ))}
        <div className='addPhoto'>
          <IoMdAdd className='add' />
        </div>
      </div>
    </div>
  );
};

export { EditCollection };
