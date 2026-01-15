import React, { useState, useEffect } from 'react';
import { Collection, CollectionType } from '@film/photos-iso';
import {
  usePhotos,
  useAdminTools,
  useAdminCollectionForm,
} from '@film/photos-web';
import { LuSwitchCamera } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { FaPhotoFilm } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { useAuth } from '@clerk/clerk-react';
import { useParams, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

import '../styles/Admin.scss';

//
// Child Component: Renders the edit form once we have the card data.
// Note: This component always calls its hooks in the same order.
//
interface EditCollectionInnerProps {
  finalCard: Collection;
}

const EditCollectionInner: React.FC<EditCollectionInnerProps> = ({
  finalCard,
}) => {
  const { getToken } = useAuth();
  const { getPhotosbyCID } = usePhotos();
  const { collectionCoverChange } = useAdminTools();

  // Now that finalCard is available, it's safe to call these hooks.
  const photos = getPhotosbyCID({ id: finalCard.id });
  const { handleFormChange, submitCollectionEdit, isEdited } =
    useAdminCollectionForm(finalCard);

  const handleCoverImageClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      collectionCoverChange(file, finalCard.ref);
    }
  };

  const handleIconClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div>
      <form className='albumInfoForm'>
        <div className='selectedTop'>
          <div className='selectedAlbumImg'>
            <div className='relative h-[350px] w-full max-w-[350px] overflow-hidden cursor-pointer'>
              <img
                src={finalCard.cover_image}
                alt={finalCard.card_name}
                className='photoImage'
                onError={(e) => {
                  e.currentTarget.src = '/path/to/fallback-image.jpg';
                }}
              />
            </div>
            <div>
              <LuSwitchCamera
                className='selectedAlbumIcon'
                onClick={handleIconClick}
              />
              <input
                id='fileInput'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleCoverImageClick}
              />
            </div>
          </div>
          <div className='selectedTopInfo'>
            <div className='selectedAlbumName'>
              <span>
                <p className='inputHeader'>Album Name</p>
                <input
                  type='text'
                  name='card_name'
                  className='editBox'
                  onChange={(e) =>
                    handleFormChange('card_name', e.target.value)
                  }
                  placeholder={finalCard.card_name}
                />
              </span>

              {isEdited && (
                <button
                  type='submit'
                  className={`submitButton ${isEdited ? 'hoverEnabled' : ''}`}
                  disabled={!isEdited}
                  onClick={async (e) => {
                    e.preventDefault();
                    const token = await getToken();
                    if (token) {
                      submitCollectionEdit(token);
                    }
                  }}
                >
                  Save Changes
                </button>
              )}
            </div>
            <div className='selectedHeaders'>
              <span>
                <p className='inputHeader'>Text Color</p>
                <input
                  type='text'
                  name='textColor'
                  className='editBox'
                  onChange={(e) =>
                    handleFormChange('text_color', e.target.value)
                  }
                  placeholder={finalCard.colors.textColor}
                />
              </span>
              <span>
                <p className='inputHeader'>Shadow Color</p>
                <input
                  type='text'
                  name='shadowColor'
                  className='editBox'
                  placeholder={finalCard.colors.shadowColor}
                  onChange={(e) =>
                    handleFormChange('shadow_color', e.target.value)
                  }
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
                  placeholder={finalCard.display_name || 'null'}
                  onChange={(e) =>
                    handleFormChange('display_name', e.target.value)
                  }
                />
              </span>
              <span>
                <p className='inputHeader'>Ref</p>
                <input
                  type='text'
                  name='ref'
                  className='editBox'
                  placeholder='Contact Backend Team for ref change'
                  disabled
                />
              </span>
            </div>
            <p className='inputHeader'>Description</p>
            <textarea
              name='desc'
              className='editDesc'
              onChange={(e) => handleFormChange('desc', e.target.value)}
              placeholder='Enter description'
            />
          </div>
        </div>
      </form>

      <div className='photoGrid'>
        {photos.map((pics, index) => (
          <div key={index} className='photoSection'>
            <div className='relative h-[300px] w-full max-w-[300px] overflow-hidden'>
              <img
                src={pics.url}
                alt='grid item'
                className='collectionPhotos'
              />
            </div>
            <div className='photoOptions'>
              <FaPhotoFilm className='photoSwitch' />
              <MdDelete className='photoDelete' />
            </div>
          </div>
        ))}
        <div className='addPhoto'>
          <IoMdAdd className='add' />
        </div>
      </div>
    </div>
  );
};

//
// Parent Component: Handles fetching the card data and conditionally rendering
// the child component. The hooks in this component are always called in the same order.
//
const EditCollection: React.FC = () => {
  const { ref } = useParams<{ ref: CollectionType }>();
  const location = useLocation();
  const card = location.state?.card;
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [loading, setLoading] = useState<boolean>(!card);

  async function getCollection(ref: CollectionType) {
    const collectionsRef = collection(db, 'collection');
    const q = query(collectionsRef, where('ref', '==', ref));

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error('No collection found');
    }

    const docSnapshot = snapshot.docs[0];
    const data = docSnapshot.data() as Omit<Collection, 'id'>;
    return { id: docSnapshot.id, ...data };
  }

  useEffect(() => {
    if (!card && ref) {
      const fetchData = async () => {
        try {
          const match = await getCollection(ref);
          setCollectionData(match);
        } catch (error) {
          console.error('Error fetching collection:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [card, ref]);

  if (loading) return <div>Loading...</div>;

  // Use either the card from location state or the fetched collectionData
  const finalCard = card || collectionData;

  // Even though finalCard might be null at first, this component always calls its hooks in the same order.
  // We now render the child component only when we have valid data.
  if (!finalCard) return <div>No collection data available</div>;

  return <EditCollectionInner finalCard={finalCard} />;
};

export { EditCollection };
