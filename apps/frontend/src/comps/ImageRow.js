/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import '../css/ImageRow.css';

function ImageRow({ slides }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedPic, setPickedPic] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('');

  useEffect(() => {
    if (pickedPic) {
      const img = new Image();
      img.src = pickedPic;
      img.onload = () => {
        const ratio = img.height > img.width ? 'portrait' : 'landscape';
        setAspectRatio(ratio);
      };
    }
  }, [pickedPic]);

  const openModal = (index, image) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setPickedPic(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='image-row'>
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image_url}
          className={`thumbnail ${index === 0 ? 'first-thumbnail' : ''} ${
            index === slides.length - 1 ? 'last-thumbnail' : ''
          }`}
          onClick={() => openModal(index, slide.image_url)}
        />
      ))}

      {isModalOpen && (
        <div className='modal'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>

          <div className='popUpPic'>
            <img
              src={pickedPic}
              className={`selectedPicture ${
                aspectRatio === 'landscape' ? 'landscape' : 'portrait'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageRow;
