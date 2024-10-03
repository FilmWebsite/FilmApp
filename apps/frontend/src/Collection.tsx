import React, { useState, useEffect } from 'react';
import './css/albumSet.css';
import ImageRow from './comps/ImageRow.tsx';
import { Header } from './comps/Header';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useCollection } from '@film/photos-web';
import { CollectionType } from '@film/photos-iso';
import Loading from './comps/Loading.tsx';
import { useFooterDispatch } from './providers/FooterProvider.tsx';

const Collection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { collection } = useParams<{ collection: CollectionType }>();

  const { collection: data, loading, error } = useCollection(collection!);

  const [collectionData, setCollectionData] = useState<any>({});
  const [photos, setPhotos] = useState<any[]>([]);
  const loadingDis = useFooterDispatch();

  // useEffect(() => {
  //   if (data && Object.keys(data).length !== 0) {
  //     // @ts-ignore
  //     setCollectionData(data.collection);
  //     // @ts-ignore

  //     setPhotos(data.photos);
  //   }
  // }, [data]);

  // const handleImageClick = (image: string) => {
  //   setSelectedImage(image);
  // };

  // useEffect(() => {
  //   if (loading) {
  //     toggleFooter(loadingDis);
  //   }

  //   return () => {
  //     toggleFooter(loadingDis); // Hide footer
  //   };
  // }, [loading, loadingDis]);

  if (loading) {
    return <Loading />;
  }

  // TODO: make fallback for error
  if (error) return <p>Error loading collection.</p>;

  return (
    collectionData && (
      <div className='nyc-container'>
        <a href='/'>
          <IoChevronBackOutline className='icon' />
        </a>
        <div className='info-container'>
          <Header
            album={collectionData.display_name || collectionData.card_name}
            shadowColor={collectionData.colors?.shadowColor}
            textColor={collectionData.colors?.textColor}
          />
          <p className='albumInfo'>{collectionData.desc || 'Coming soon...'}</p>
        </div>
        <div className='Image-container'>
          <ImageRow
            // @ts-ignore
            current={data.collection.id}
            slides={photos}
            handleImageClick={handleImageClick}
          />
        </div>
      </div>
    )
  );
};

export { Collection };
