import React, { useState, useEffect } from 'react';
import './css/albumSet.css';
import ImageRow from './comps/ImageRow';
import { Header } from './comps/Header';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useCollection } from '@film/photos-web';
import { CollectionType } from '@film/photos-iso';

const Collection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { collection } = useParams<{ collection: string }>();

  // @ts-ignore
  const { data, loading, error } = useCollection(collection);
  const [collectionData, setCollectionData] = useState<any>({});
  const [photos, setPhotos] = useState<any[]>([]);
  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      // @ts-ignore
      setCollectionData(data.collection.collection);
      // @ts-ignore
      setPhotos(data.collection.photos);
    }
  }, [data]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading collection.</p>;

  console.log(collectionData);

  return (
    collectionData && (
      <div className='nyc-container'>
        <a href='/'>
          <IoChevronBackOutline className='icon' />
        </a>
        <div className='info-container'>
          <Header
            album={collectionData.display_name || collectionData.name}
            shadowColor={collectionData.colors?.shadowColor}
            textColor={collectionData.colors?.textColor}
          />
          <p className='albumInfo'>{collectionData.desc}</p>
        </div>
        <div className='Image-container'>
          {/* Pass fetched data instead of SliderData */}
          <ImageRow slides={photos} handleImageClick={handleImageClick} />
        </div>
      </div>
    )
  );
};

export { Collection };
