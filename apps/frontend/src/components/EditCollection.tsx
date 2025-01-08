import React from 'react';
import { Collection } from '@film/photos-iso';
import { EditImageRow } from './EditImageRow';
import { usePhotos } from '@film/photos-web';
import '../styles/Admin.scss';
// import { IoChevronBackOutline } from 'react-icons/io5';

type EditCollectionProps = {
  selectedCard: Collection; // Receive the selected card
  setSelectedCard: React.Dispatch<React.SetStateAction<Collection | null>>; // Receive setSelectedCard function
};

const EditCollection = ({
  selectedCard,
  setSelectedCard,
}: EditCollectionProps) => {
  const { getPhotosbyCID } = usePhotos();

  const photos = getPhotosbyCID({ id: selectedCard.id });

  return (
    <div>
      <a onClick={() => setSelectedCard(null)}>Back</a>

      <div className='selectedTop'>
        <div className='relative h-[350px] w-full max-w-[350px] overflow-hidden cursor-pointer'>
          <img
            src={selectedCard.cover_image}
            alt={selectedCard.card_name}
            className='absolute inset-0 z-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
            onError={(e) => {
              e.currentTarget.src = '/path/to/fallback-image.jpg';
            }}
          />
        </div>

        <div className='selectedTopInfo'>
          <h1 className='selectedTitle'>{selectedCard.card_name}</h1>

          <div className='selectedHeaders'>
            <div className='selectedColorsInput'>
              <p className='inputHeader'>Text Color</p>
              <p>{selectedCard.colors.textColor}</p>
            </div>

            <div className='selectedColorsInput'>
              <p className='inputHeader'>Shadow Color</p>
              <p>{selectedCard.colors.shadowColor}</p>
            </div>
          </div>

          <div className='selectedHeaders'>
            <div className='selectedDisplayName'>
              <p className='inputHeader'>Display Name</p>
              <p>{selectedCard.display_name || 'no display name'}</p>
            </div>

            <div className='selectedDisplayName'>
              <p className='inputHeader'>Ref</p>
              <p>{selectedCard.ref || 'no ref name'}</p>
            </div>
          </div>

          <p className='inputHeader'>Description</p>
          <p className='selectedDesc'>
            {selectedCard.desc || 'coming soon...'}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-8 justify-center'>
        <div>{selectedCard.card_name}</div>
      </div>

      <div className='grid grid-cols-4 gap-8 justify-center'>
        {photos.map((p, index) => (
          <img
            key={index} // Provide a unique key for each item
            src={p.url}
            alt='grid item'
            // style={{ visibility: 'hidden', position: 'absolute' }} // Hide img tag
          />
        ))}
      </div>
    </div>
  );
};

export { EditCollection };
