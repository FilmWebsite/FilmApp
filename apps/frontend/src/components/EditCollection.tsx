import React, { useState } from 'react';
import { Collection } from '@film/photos-iso';
import '../styles/Admin.scss';

type EditCollectionProps = {
  selectedCard: Collection;
  setSelectedCard: React.Dispatch<React.SetStateAction<Collection | null>>;
};

const EditCollection = ({ selectedCard, setSelectedCard }: EditCollectionProps) => {
  const [editableCard, setEditableCard] = useState({ ...selectedCard });

  const handleChange = (field: string, value: string) => {
    setEditableCard((prev) => ({ ...prev, [field]: value }));
  };

  const handleColorChange = (field: string, value: string) => {
    setEditableCard((prev) => ({
      ...prev,
      colors: { ...prev.colors, [field]: value },
    }));
  };

  return (
    <div>
      <button onClick={() => setSelectedCard(null)} className="back-button" aria-label="Go back">
        Back
      </button>

      <div className="selectedTop">
        {/* Editable Cover Image */}
        <div className="relative h-[350px] w-full max-w-[350px] overflow-hidden cursor-pointer">
          <input
            type="text"
            value={editableCard.cover_image}
            onChange={(e) => handleChange('cover_image', e.target.value)}
            className="coverImageInput"
            placeholder="Cover Image URL"
          />
          <img
            src={editableCard.cover_image}
            alt={editableCard.card_name}
            className="absolute inset-0 z-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/path/to/fallback-image.jpg';
            }}
          />
        </div>

        {/* Editable Information */}
        <div className="selectedTopInfo">
          {/* Editable Title */}
          <input
            type="text"
            value={editableCard.card_name}
            onChange={(e) => handleChange('card_name', e.target.value)}
            className="selectedTitleInput"
          />

          {/* Editable Colors */}
          <div className="selectedHeaders">
            <div className="selectedColorsInput">
              <p className="inputHeader">Text Color</p>
              <input
                type="text"
                value={editableCard.colors.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="textColorInput"
              />
            </div>

            <div className="selectedColorsInput">
              <p className="inputHeader">Shadow Color</p>
              <input
                type="text"
                value={editableCard.colors.shadowColor}
                onChange={(e) => handleColorChange('shadowColor', e.target.value)}
                className="shadowColorInput"
              />
            </div>
          </div>

          {/* Editable Display Name and Ref */}
          <div className="selectedHeaders">
            <div className="selectedDisplayName">
              <p className="inputHeader">Display Name</p>
              <input
                type="text"
                value={editableCard.display_name || ''}
                onChange={(e) => handleChange('display_name', e.target.value)}
                className="displayNameInput"
              />
            </div>

            <div className="selectedDisplayName">
              <p className="inputHeader">Ref</p>
              <input
                type="text"
                value={editableCard.ref || ''}
                onChange={(e) => handleChange('ref', e.target.value)}
                className="refInput"
              />
            </div>
          </div>

          {/* Editable Description */}
          <p className="inputHeader">Description</p>
          <textarea
            value={editableCard.desc || ''}
            onChange={(e) => handleChange('desc', e.target.value)}
            className="descriptionInput"
            placeholder="Enter description..."
          />
        </div>
      </div>
    </div>
  );
};

export { EditCollection };
