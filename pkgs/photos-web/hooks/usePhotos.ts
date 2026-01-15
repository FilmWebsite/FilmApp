import { useEffect, useState, useCallback } from 'react';
// FIXME: remove .js extension
import { P, Photo, CollectionType, Collection } from '@film/photos-iso';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase.js';

export function usePhotos() {
  const [photosLoading, setPhotosLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[] | null>();
  const [collections, setCollections] = useState<Collection[] | null>();

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

  const filterAboutMedia = useCallback(() => {
    if (Array.isArray(photos) && !photosLoading) {
      return photos.filter(
        (photo: Photo) => photo?.url?.includes('about/') // Check if URL contains 'about/'
      );
    } else {
      return [];
    }
  }, [photos, photosLoading]);

  useEffect(() => {
    // Set up a Firestore listener for the collections
    const collectionsRef = collection(db, 'collection');
    const unsubscribe = onSnapshot(collectionsRef, (snapshot) => {
      const collectionList = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Collection, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });
      setCollections(collectionList);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setPhotos(await getPhotosandMetadata());
    };

    fetchPhotos();
  }, [db]);

  // useEffect(() => {
  //   const c = async () => {
  //     setCollection(await returnCollections());
  //   };

  //   c();
  // }, []);

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
    ({ id }: { id: CollectionType | string }) => {
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
    collections, // Updated to return the collections state
    homePhotos: filterHomeDisplay(),
    // !admin testing only
    allPhotos: photos?.slice(0, 5),
    aboutMedia: filterAboutMedia(),
  };
}
