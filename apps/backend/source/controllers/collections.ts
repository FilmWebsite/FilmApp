import { pool } from '@film/postgres-api';
import { CollectionType } from '@film/photos-iso';

export const CollectionController = async (collection: CollectionType) => {
  const client = await pool.connect();
  try {
    // Query for collection data
    const queryCollectionData =
      'SELECT * FROM PHOTOS.COLLECTION WHERE ref = $1 LIMIT 1;';
    const collectionResult = await client.query(queryCollectionData, [
      collection,
    ]);

    const queryPhotos = `
    SELECT * FROM PHOTOS.PHOTO WHERE collection = $1;
  `;
    const photosResult = await client.query(queryPhotos, [collection]);

    // console.log(photosResult, 'hellooo');

    // // Extract data from results
    const collectionData = collectionResult.rows[0];

    const photos = photosResult.rows;

    return { collection: collectionData, photos: photos };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting store data');
  } finally {
    client.release();
  }
};
