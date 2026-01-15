import { usePhotos } from '@film/photos-web';
import { FaExchangeAlt } from 'react-icons/fa';
import ImageList from '@mui/material/ImageList';
import { useState } from 'react';
import { PhotoModal } from './SwitchHomePhoto';

const GalleryAdmin = () => {
  const { homePhotos, allPhotos } = usePhotos();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (photoUrl: string | null) => {
    if (photoUrl) {
      setSelectedPhotoUrl(photoUrl); // Update state with selected photo URL
    }
    setModalOpen(false);
  };

  return (
    <div className='grid grid-cols-4 grid-rows-4 h-[450px] gap-1'>
      {homePhotos.map((square, index) => (
        <div
          key={index}
          className='relative w-[100px] h-[100px] group'
          style={{
            backgroundImage: `url(${square.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={square.url}
            alt='grid item'
            className='hidden' // Hide the img tag
          />
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
            <button onClick={handleOpenModal}>
              <FaExchangeAlt color='#f94e63' />
            </button>
          </div>
        </div>
      ))}

      {/* Modal Section */}
      {isModalOpen && (
        <PhotoModal photos={allPhotos} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export { GalleryAdmin };
