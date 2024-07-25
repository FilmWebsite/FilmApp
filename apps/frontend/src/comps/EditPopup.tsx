import React, { useState, useEffect } from 'react';
import { Collection } from '@film/photos-iso';

interface EditPopupProps {
  card: Collection;
  onClose: () => void;
  editCollection: any;
}

const EditPopup: React.FC<EditPopupProps> = ({
  card,
  onClose,
  editCollection,
}) => {
  const [title, setTitle] = useState(card.name);
  console.log(card);

  const [newName, setNewName] = useState<string | null>(null);
  const [newShadowColor, setNewShadowColor] = useState<string | null>(null);
  const [newTextColor, setNewTextColor] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState<string | null>(null);
  const [displayName, setNewDisplayName] = useState<string | null>(null);

  // useEffect(() => {
  //   setTitle(card.name);
  //   setTextColor(card.textColor || '');
  //   setShadowColor(card.shadowColor || '');
  //   setDescription(card.description || '');
  //   setThumbnail(card.cover);
  //   // setPictures(card.pictures || []);
  // }, [card]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(URL.createObjectURL(file));
  };

  const handlePicturesChange = (e) => {
    const files = Array.from(e.target.files);
    // @ts-ignore
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    // @ts-ignore
    setPictures((prevPictures) => [...prevPictures, ...filePreviews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCard = {
      name: newName,
      textColor: newTextColor || card.colors.textColor,
      shadowColor: newShadowColor || card.colors.shadowColor,
      description: newDescription,
      display_name: displayName,
      // cover: thumbnail,
      // pictures,
    };
    // onSave(updatedCard);

    editCollection({
      id: card.id,
      data: updatedCard,
    });

    onClose();
  };

  return (
    <div className='editAlbum-overlay'>
      <span className='close' onClick={onClose}>
        &times;
      </span>
      <form className='editAlbum-content' onSubmit={handleSubmit}>
        <h1 className='editAlbum-header'>Edit {card.name} Album</h1>

        <h2 className='editAlbum-headers'>Title:</h2>
        <input
          className='inputField'
          type='text'
          placeholder={title}
          onChange={(e) => setNewName(e.target.value)}
        />

        <div className='inputContainer'>
          <div className='inputPair'>
            <h2 className='editAlbum-headers'>Text Color:</h2>
            <input
              className='inputField'
              type='text'
              placeholder={card.colors.textColor}
              onChange={(e) => setNewTextColor(e.target.value)}
            />
          </div>
          <div className='inputPair'>
            <h2 className='editAlbum-headers'>Shadow Color:</h2>
            <input
              className='inputField'
              type='text'
              placeholder={card.colors.shadowColor}
              onChange={(e) => setNewShadowColor(e.target.value)}
            />
          </div>
        </div>

        <h2 className='editAlbum-headers'>Album Description:</h2>
        <textarea
          className='inputField descriptionBox'
          placeholder={card.description}
          onChange={(e) => setNewDescription(e.target.value)}
        ></textarea>

        <h2 className='editAlbum-headers'>Select Album Thumbnail:</h2>
        {card.cover && (
          <div className='previewContainer'>
            <img
              src={card.cover}
              alt='Thumbnail Preview'
              className='thumbnailPreview'
            />
          </div>
        )}
        <input
          className='inputField'
          type='file'
          accept='image/*'
          onChange={handleThumbnailChange}
        />

        <h2 className='editAlbum-headers'>Select Pictures for Album:</h2>
        {/* <div className='imagePreviewsSlider'>
          <div className='imagePreviews'>
            {pictures.map((src, index) => (
              <div key={index} className='previewContainer'>
                <img
                  src={src}
                  alt={`preview ${index}`}
                  className='imagePreview'
                />
              </div>
            ))}
          </div>
        </div> */}
        <input
          className='inputField'
          type='file'
          multiple
          onChange={handlePicturesChange}
        />

        <h2 className='editAlbum-headers'>Display Name:</h2>
        <input
          className='inputField'
          type='text'
          placeholder={card.display_name || 'Null'}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />

        <div className='editAlbum-button'>
          <button className='editAlbumButton' type='submit'>
            Finish Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPopup;
