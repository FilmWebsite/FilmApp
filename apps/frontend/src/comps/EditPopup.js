import React, { useState, useEffect } from "react";

const EditPopup = ({ card, onClose, onSave }) => {
  const [title, setTitle] = useState(card.name);
  const [textColor, setTextColor] = useState(card.textColor || "");
  const [shadowColor, setShadowColor] = useState(card.shadowColor || "");
  const [description, setDescription] = useState(card.description || "");
  const [thumbnail, setThumbnail] = useState(card.cover);
  const [pictures, setPictures] = useState(card.pictures || []);

  useEffect(() => {
    setTitle(card.name);
    setTextColor(card.textColor || "");
    setShadowColor(card.shadowColor || "");
    setDescription(card.description || "");
    setThumbnail(card.cover);
    setPictures(card.pictures || []);
  }, [card]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(URL.createObjectURL(file));
  };

  const handlePicturesChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPictures((prevPictures) => [...prevPictures, ...filePreviews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCard = {
      ...card,
      name: title,
      textColor,
      shadowColor,
      description,
      cover: thumbnail,
      pictures,
    };
    onSave(updatedCard);
    onClose();
  };

  return (
    <div className="editAlbum-overlay">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <form className="editAlbum-content" onSubmit={handleSubmit}>
        <h1 className="editAlbum-header">Edit {card.name} Album</h1>

        <h2 className="editAlbum-headers">Title:</h2>
        <input
          className="inputField"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="inputContainer">
          <div className="inputPair">
            <h2 className="editAlbum-headers">Text Color:</h2>
            <input
              className="inputField"
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className="inputPair">
            <h2 className="editAlbum-headers">Shadow Color:</h2>
            <input
              className="inputField"
              type="text"
              value={shadowColor}
              onChange={(e) => setShadowColor(e.target.value)}
            />
          </div>
        </div>

        <h2 className="editAlbum-headers">Album Description:</h2>
        <textarea
          className="inputField descriptionBox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <h2 className="editAlbum-headers">Select Album Thumbnail:</h2>
        {thumbnail && (
          <div className="previewContainer">
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="thumbnailPreview"
            />
          </div>
        )}
        <input
          className="inputField"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />

        <h2 className="editAlbum-headers">Select Pictures for Album:</h2>
        <div className="imagePreviewsSlider">
          <div className="imagePreviews">
            {pictures.map((src, index) => (
              <div key={index} className="previewContainer">
                <img
                  src={src}
                  alt={`preview ${index}`}
                  className="imagePreview"
                />
              </div>
            ))}
          </div>
        </div>
        <input
          className="inputField"
          type="file"
          multiple
          onChange={handlePicturesChange}
        />

        <h2 className="editAlbum-headers">Display Name:</h2>
        <input
          className="inputField"
          type="text"
          value={card.displayName || "Null"}
          disabled
        />

        <div className="editAlbum-button">
          <button className="editAlbumButton" type="submit">
            Finish Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPopup;
