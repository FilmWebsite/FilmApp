import React, { useState } from 'react';
import './sass/Modals.scss'; // Import the modal styles
import { GalleryAdmin } from './GalleryAdmin';

const PhotosAdminModal = () => {
  const [activeOption, setActiveOption] = useState('Gallery'); // Default option
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Render content based on the selected option
  const renderContent = () => {
    if (activeOption === 'Gallery') {
      return <GalleryAdmin />;
    } else if (activeOption === 'Photos') {
      return <div>Photos Content</div>;
    } else {
      return <div>Select an option</div>;
    }
  };

  return (
    <div className='page'>
      <div className='page-content'>
        <div className='left-side'>
          <h2 className='font-bold text-[20px]'>Photo Admin Portal</h2>
          {!unsavedChanges && <p className='text-[12px]'>Unsaved Changes</p>}
          <div className='admin-options'>
            <p
              className={`option ${activeOption === 'Gallery' ? 'active' : ''}`}
              onClick={() => setActiveOption('Gallery')}
            >
              Gallery
            </p>
            <p
              className={`option ${activeOption === 'Gallery' ? 'active' : ''}`}
              onClick={() => setActiveOption('Gallery')}
            >
              Collections
            </p>
            <p
              className={`option ${activeOption === 'Photos' ? 'active' : ''}`}
              onClick={() => setActiveOption('Photos')}
            >
              Photos
            </p>
          </div>
        </div>
        <div className='right-side'>{renderContent()}</div>
      </div>
    </div>
  );
};

export { PhotosAdminModal };
