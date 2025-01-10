import React, { useState, useEffect } from 'react';
import { Collection } from '@film/photos-iso';
import { usePhotos } from '@film/photos-web';
import '../styles/Admin.scss';
import { LuSwitchCamera } from 'react-icons/lu';
import { MdDelete } from "react-icons/md";
import { FaPhotoFilm } from "react-icons/fa6";
import { IoMdAdd } from 'react-icons/io';

type EditCollectionProps = {
  selectedCard: Collection;
  setSelectedCard: React.Dispatch<React.SetStateAction<Collection | null>>;
};

const EditCollection = ({ selectedCard, setSelectedCard }: EditCollectionProps) => {
  const { getPhotosbyCID } = usePhotos();
  const photos = getPhotosbyCID({ id: selectedCard.id });

  const [isEdited, setIsEdited] = useState(false);
  const [formData, setFormData] = useState({
    card_name: selectedCard.card_name,
    textColor: selectedCard.colors.textColor,
    shadowColor: selectedCard.colors.shadowColor,
    display_name: selectedCard.display_name || '',
    ref: selectedCard.ref || '',
    desc: selectedCard.desc || '',
  });

  useEffect(() => {
    // Compare form data with original values to check for changes
    const hasChanges = 
      formData.card_name !== selectedCard.card_name ||
      formData.textColor !== selectedCard.colors.textColor ||
      formData.shadowColor !== selectedCard.colors.shadowColor ||
      formData.display_name !== selectedCard.display_name ||
      formData.ref !== selectedCard.ref ||
      formData.desc !== selectedCard.desc;
    
    setIsEdited(hasChanges);
  }, [formData, selectedCard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <a onClick={() => setSelectedCard(null)}>Back</a>
      <form className='albumInfoForm'>
        <div className='selectedTop'>
          <div className="selectedAlbumImg">
            <div className="relative h-[350px] w-full max-w-[350px] overflow-hidden cursor-pointer">
              <img
                src={selectedCard.cover_image}
                alt={selectedCard.card_name}
                className="photoImage"
                onError={(e) => {
                  e.currentTarget.src = '/path/to/fallback-image.jpg';
                }}
              />
            </div>
            <LuSwitchCamera className="selectedAlbumIcon" />
          </div>
          <div className='selectedTopInfo'>
            <div className='selectedAlbumName'>
              <span>
                <p className='inputHeader'>Album Name</p>
                <input
                  type='text'
                  name='card_name'
                  className='editBox'
                  value={formData.card_name}
                  onChange={handleInputChange}
                  placeholder='Enter card name'
                />
              </span>
              <button
                type="submit"
                className={`submitButton ${isEdited ? 'hoverEnabled' : ''}`}
                disabled={!isEdited}
              >
                Save Changes
              </button>
            </div>
            <div className='selectedHeaders'>
              <span>
                <p className='inputHeader'>Text Color</p>
                <input
                  type='text'
                  name='textColor'
                  className='editBox'
                  value={formData.textColor}
                  onChange={handleInputChange}
                  placeholder='Enter text color'
                />
              </span>
              <span>
                <p className='inputHeader'>Shadow Color</p>
                <input
                  type='text'
                  name='shadowColor'
                  className='editBox'
                  value={formData.shadowColor}
                  onChange={handleInputChange}
                  placeholder='Enter shadow color'
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
                  value={formData.display_name}
                  onChange={handleInputChange}
                  placeholder='Enter display name'
                />
              </span>
              <span>
                <p className='inputHeader'>Ref</p>
                <input
                  type='text'
                  name='ref'
                  className='editBox'
                  value={formData.ref}
                  onChange={handleInputChange}
                  placeholder='Enter reference'
                />
              </span>
            </div>
            <p className='inputHeader'>Description</p>
            <textarea
              name='desc'
              className='editDesc'
              value={formData.desc}
              onChange={handleInputChange}
              placeholder='Enter description'
            />
          </div>
        </div>
      </form>

      <div className="photoGrid">
        {photos.map((pics, index) => (
          <div key={index} className="photoSection">
            <div key={index} className="relative h-[300px] w-full max-w-[300px] overflow-hidden">
              <img src={pics.url} alt="grid item" className="collectionPhotos" />
            </div>
            <div className='photoOptions'>
              <FaPhotoFilm className='photoSwitch' />
              <MdDelete className='photoDelete' />
            </div>
          </div>
        ))}
        <div className="addPhoto">
          <IoMdAdd className='add' />
        </div>
      </div>
    </div>
  );
};

export { EditCollection };
