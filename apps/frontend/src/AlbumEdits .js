import React, { useState } from "react";
import "./css/AlbumEdit.css";
import Cards from "./comps/Cards";
import SquareData from "./comps/SquareData";
import { MdEdit, MdDelete, MdOutlineFindReplace } from "react-icons/md";

function AlbumEdits() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [selectedPic, setSelectedPic] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setSelectedFiles((prevFiles) => [file]);
    const filePreview = URL.createObjectURL(file);
    setThumbnailPreview(filePreview);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
  };

  const handleDeletePreview = (index) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const handleIconClick = (pic) => {
    setSelectedPic(pic);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPic(null);
  };

  const handlePopupFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newPicUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedPic({ ...selectedPic, src: newPicUrl });
      // Optionally update the source in SquareData if needed.
    }
  };

  const handleDeleteClick = (card) => {
    setAlbumToDelete(card);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirmationChange = (e) => {
    setDeleteConfirmation(e.target.value);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation === albumToDelete.title) {
      // Handle the deletion logic here
      setIsDeletePopupOpen(false);
      setAlbumToDelete(null);
      setDeleteConfirmation("");
    } else {
      // Handle mismatch case
      alert("Album name does not match.");
    }
  };

  return (
    <div className="albumEditPage">
      <div className="currentAlbums">
        <h1 className="editAlbumHeader">Current Albums</h1>
        <div className="albumSlider">
          {Cards.map((card, index) => (
            <Card
              card={card}
              key={card.id}
              isFirst={index === 0}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>

      <div className="shufflePictures">
        <h1 className="currShuffleHeader">Current Shuffle Pictures</h1>
        <div className="albumSlider">
          {SquareData.map((picture, index) => (
            <Pic
              pic={picture}
              key={picture.id}
              isFirst={index === 0}
              onClick={handleIconClick}
            />
          ))}
        </div>
      </div>

      <form className="addAlbums">
        <h1 className="addAlbumHeader">Add Albums</h1>
        <h2 className="addAlbumHeaders">Title:</h2>
        <input className="inputField" type="text" placeholder="Album Title" />
        <h2 className="addAlbumHeaders">Album Description:</h2>
        <textarea
          className="inputField descriptionBox"
          placeholder="Album Description"
        ></textarea>
        <h2 className="addAlbumHeaders">Select Album Thumbnail:</h2>
        {thumbnailPreview && (
          <div className="previewContainer">
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="thumbnailPreview"
            />
            <button
              className="deletePreview"
              onClick={() => setThumbnailPreview(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
        <input
          className="inputField"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />

        <h2 className="addAlbumHeaders">Select Pictures for Album:</h2>
        <div className="imagePreviews">
          {previews.map((src, index) => (
            <div key={index} className="previewContainer">
              <img
                src={src}
                alt={`preview ${index}`}
                className="imagePreview"
              />
              <button
                className="deletePreview"
                onClick={() => handleDeletePreview(index)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <input
          className="inputField"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <div className="buttonContainer">
          <button className="addAlbumButton" type="submit">
            Add New Album
          </button>
        </div>
      </form>
      <div className="logoutContainer">
        <p className="logOutQuestion">All finished up here?</p>
        <a href="/" className="logOutButton">
          Logout
        </a>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <img src={selectedPic.src} alt={`Selected ${selectedPic.id}`} />
            <input type="file" onChange={handlePopupFileChange} />
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="popup deletePopup">
          <div className="popupContent deletePopupContent">
            <span className="close" onClick={() => setIsDeletePopupOpen(false)}>
              &times;
            </span>
            <p>Type the name of the album to confirm deletion:</p>
            <input
              type="text"
              className="deletePopupInput"
              value={deleteConfirmation}
              onChange={handleDeleteConfirmationChange}
            />
            <button className="deletePopupButton" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumEdits;

const Card = ({ card, isFirst, onDeleteClick }) => {
  return (
    <div className="group" style={{ marginLeft: isFirst ? 0 : "10px" }}>
      <div
        key={card.id}
        className="group relative h-[215px] w-[215px] overflow-hidden bg-neutral-200"
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p className="albumTitle">{card.title}</p>
        </div>
      </div>
      <div className="iconContainer">
        <MdEdit className="editIcon" />
        <MdDelete className="deleteIcon" onClick={() => onDeleteClick(card)} />
      </div>
    </div>
  );
};

const Pic = ({ pic, isFirst, onClick }) => {
  return (
    <div className="group" style={{ marginLeft: isFirst ? 0 : "10px" }}>
      <div
        key={pic.id}
        className="group relative h-[150px] w-[150px] overflow-hidden bg-neutral-200"
        onClick={() => onClick(pic)}
      >
        <div
          style={{
            backgroundImage: `url(${pic.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
      </div>
      <div className="iconContainer">
        <MdOutlineFindReplace
          className="replaceIcon"
          onClick={() => onClick(pic)}
        />
      </div>
    </div>
  );
};
