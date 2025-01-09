import React from 'react';
import { Collection } from '@film/photos-iso';
import { usePhotos } from '@film/photos-web';
import '../styles/Admin.scss';
import { LuSwitchCamera } from 'react-icons/lu';
import { MdDelete } from "react-icons/md";
import { FaPhotoFilm } from "react-icons/fa6";
import { IoMdAdd } from 'react-icons/io';
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
                                className='editBox'
                                defaultValue={selectedCard.card_name}
                                placeholder='Enter card name'
                            />
                        </span>
                        
                        <button type="submit" className="submitButton">Save Changes</button>
                    </div>    

                    <div className='selectedHeaders'>

                        <span>
                            <p className='inputHeader'>Text Color</p>
                            <input
                            type='text'
                            className='editBox'
                            defaultValue={selectedCard.colors.textColor}
                            placeholder='Enter text color'
                            />
                        </span>

                        <span>
                            <p className='inputHeader'>Shadow Color</p>
                            <input
                            type='text'
                            className='editBox'
                            defaultValue={selectedCard.colors.shadowColor}
                            placeholder='Enter shadow color'
                            />
                        </span>

                    </div>

                    <div className='selectedHeaders'>

                        <span>
                            <p className='inputHeader'>Display Name</p>
                            <input
                            type='text'
                            className='editBox'
                            defaultValue={selectedCard.display_name || 'no display name'}
                            placeholder='Enter display name'
                            />
                        </span>

                        <span>
                            <p className='inputHeader'>Ref</p>
                            <input
                            type='text'
                            className='editBox'
                            defaultValue={selectedCard.ref || 'no ref name'}
                            placeholder='Enter reference'
                            />
                        </span>
                    </div>

                    <p className='inputHeader'>Description</p>
                    <textarea
                    className='editDesc'
                    defaultValue={selectedCard.desc || 'coming soon...'}
                    placeholder='Enter description'
                    />

                </div>
            </div>

      </form>
      

        <div className="photoGrid">
            {photos.map((pics, index) => (
                <div key={index} className="photoSection">
                    <div key={index} className="relative h-[300px] w-full max-w-[300px] overflow-hidden">
                        <img
                            src={pics.url}
                            alt="grid item"
                            className="collectionPhotos"
                        />
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
