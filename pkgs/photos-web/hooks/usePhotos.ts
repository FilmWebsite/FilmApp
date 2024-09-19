import { useEffect, useState, useCallback } from 'react';
// FIXME: remove .js extension
import { P, Photo, CollectionType, Collection } from '@film/photos-iso';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export function usePhotos() {
  const [photosLoading, setPhotosLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[] | null>();
  const [c, setCollection] = useState<Collection[] | null>();

  const getPhotosandMetadata = async () => {
    setPhotosLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/photos/`);
      const data = await response.json();
      return data;
      // process data as needed
    } catch (error) {
      throw new Error('Photos failed to load (Check usePhotos.ts)');
      return [];
    } finally {
      setPhotosLoading(false);
    }
  };

  const returnCollections = async (): Promise<Collection[]> => {
    try {
      const collectionsRef = collection(db, 'collection');
      const snapshot = await getDocs(collectionsRef);
      const collectionList = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Collection, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });
      return collectionList;
    } catch (error) {
      throw new Error('Error fetching collections check usePhotos.ts');
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setPhotos(await getPhotosandMetadata());
    };

    fetchPhotos();
  }, [db]);

  useEffect(() => {
    const c = async () => {
      setCollection(await returnCollections());
    };

    c();
  }, []);

  console.log(c, 'from p');

  const filterHomeDisplay = useCallback(() => {
    if (photos && !photosLoading) {
      return photos
        .filter((photo: Photo) => photo.metadata.home_display === true)
        .slice(0, 16); // Limit to 16 photos
    } else {
      return [];
    }
  }, [photos, photosLoading]);

  const getPhotosByCollectionId = useCallback(
    ({ id }: { id: CollectionType }) => {
      // @ts-ignore

      if (photos && !photosLoading) {
        {
          // @ts-ignore
          return photos.filter(
            (photo: Photo) =>
              photo.metadata.collection === id ||
              photo.metadata?.collection?.includes(id)
          );
        }
      }
      return [];
    },
    [photos, photosLoading]
  );

  return {
    photosLoading: photosLoading,
    getPhotosbyCID: getPhotosByCollectionId,
    collections: c,
    homePhotos: filterHomeDisplay(),
  };
}
