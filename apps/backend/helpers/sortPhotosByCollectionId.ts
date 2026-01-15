import { Collection, CollectionType } from '@film/photos-iso';
import { Response } from 'express';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../db';
import { memoize } from './memo';

/**
 * Retrieves a collection from Firestore by its ID.
 * This function is a good candidate for memoization if collection data does not change frequently.
 */
async function getCollectionByID(
  collectionID: string
): Promise<Collection | null> {
  try {
    const docRef = doc(db, 'collection', collectionID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<Collection, 'id'>;
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw new Error('Error fetching collection check backend/helper');
  }
}

// Wrap getCollectionByID with memoization (TTL set to 60 seconds, adjust as needed)
export const getCollectionByIDMemoized = memoize(getCollectionByID, 3600000);

/**
 * Filters photos by the given collection ID and returns a response containing
 * both the collection data and the filtered photos.
 */
export async function sortPhotosByCollectionId(
  photos: {
    url: string;
    metadata: {
      home_display: boolean;
      collection: any;
    };
  }[],
  res: Response,
  collectionId: string
) {
  // // Use the memoized version of getCollectionByID
  const collection = await getCollectionByIDMemoized(collectionId);
  console.log(collection, ' hello');

  // // Filter photos that match the given collectionId.
  const filteredPhotos = photos.filter((photo) => {
    const collections = photo.metadata.collection;

    // Handle both a single ID (string) and an array of IDs.
    if (Array.isArray(collections)) {
      return collections.includes(collectionId);
    } else {
      return collections === collectionId;
    }
  });

  // // Prepare the response.
  const response = {
    collection: collection,
    photos: filteredPhotos,
  };

  return response;
}
