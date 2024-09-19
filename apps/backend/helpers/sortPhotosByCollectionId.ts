import { Collection, CollectionType } from '@film/photos-iso';
import { Response } from 'express';
import { doc, getDoc } from 'firebase/firestore'; // Import getDoc from firebase/firestore
import { db } from '../db';

async function getCollectionByID(
  CollectionID: string
): Promise<Collection | null> {
  try {
    const docRef = doc(db, 'collection', CollectionID); // Create a reference to the specific document
    const docSnap = await getDoc(docRef); // Get the document snapshot

    if (docSnap.exists()) {
      // Check if the document exists
      const data = docSnap.data() as Omit<Collection, 'id'>; // Extract the data
      return {
        id: docSnap.id, // Include the document ID
        ...data,
      };
    } else {
      console.log('No such document!');
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw new Error('Error fetching collection check backend/helper'); // Provide a meaningful error message
  }
}

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
  const collection = await getCollectionByID(collectionId);

  //   Filter photos that match the given collectionId
  const filteredPhotos = photos.filter((photo) => {
    const collections = photo.metadata.collection;

    // Handle both single ID and array of IDs
    if (Array.isArray(collections)) {
      return collections.includes(collectionId);
    } else {
      return collections === collectionId;
    }
  });

  // Prepare the response
  const response = {
    collection: collection,
    photos: filteredPhotos,
  };

  // Send the response
  return res.json(response);
}
