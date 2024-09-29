import { Response } from 'express';
import { adminStorage } from '../firebaseAdmin';
import { FirebasePhotoMetadata } from '@film/photos-iso';

export async function getFilesandMeta() {
  const [files] = await adminStorage.getFiles();

  const filePromises = files.map(async (file) => {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025',
    });

    const [metadata] = await file.getMetadata();

    const processedMetadata = {
      ...metadata.metadata,
      home_display: metadata.metadata?.home_display === 'true',
      // @ts-ignore
      collection: metadata.metadata?.collection?.includes(',')
        ? metadata.metadata.collection
            // @ts-ignore

            .split(',')
            // @ts-ignore

            .map((item) => item.trim().replace(/[\[\]]/g, ''))
        : // @ts-ignore

          metadata.metadata?.collection?.replace(/[\[\]]/g, ''),
    };

    return { url, metadata: processedMetadata };
  });

  const photos = await Promise.all(filePromises);

  return photos;
}

// Function to get the file reference from the URL
function getFileFromUrl(url: string) {
  // Remove the base URL and extract the file path
  const filePath = decodeURIComponent(
    // @ts-ignore

    url.split('/').slice(-1)[0].split('?')[0]
  );
  const file = adminStorage.file(filePath);
  return file;
}

export async function updatePicMetadata(
  res: Response,
  url: string,
  collection: string,
  oldMeta: FirebasePhotoMetadata,
  current: string,
  removeFromCollection: boolean
) {
  const filePath = decodeURIComponent(
    //  @ts-ignore
    url.split('/').slice(-1)[0].split('?')[0]
  );

  const file = adminStorage.file(filePath);

  if (removeFromCollection) {
    if (typeof oldMeta.collection === 'string') {
      oldMeta.collection = collection;
    } else if (Array.isArray(oldMeta.collection)) {
      // If it's an array, push the new collection
      oldMeta.collection.push(collection);
      oldMeta.collection = oldMeta.collection.filter(
        (item) => item !== current
      );
    }
  }

  if (!removeFromCollection) {
    if (typeof oldMeta.collection === 'string') {
      oldMeta.collection = [current, collection];
    } else if (Array.isArray(oldMeta.collection)) {
      // If it's an array, push the new collection
      oldMeta.collection.push(collection);
    }
  }

  // Define the new metadata you want to set
  const newMetadata = {
    home_display: oldMeta.home_display, // Example: Update this field as needed
    collection: oldMeta.collection, // Example: Update this field as needed
  };

  try {
    // Update the file metadata
    const updatedMetadata = await file.setMetadata({
      // @ts-ignore
      metadata: newMetadata,
    });

    console.log('Metadata updated successfully:', updatedMetadata);
    return updatedMetadata;
  } catch (error) {
    console.error('Error updating metadata:', error);
  }
}
