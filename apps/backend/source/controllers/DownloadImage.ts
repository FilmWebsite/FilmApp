import { pool } from '@film/postgres-api';

export const getPhotoViaId = async (
  image_id: string
): Promise<string | undefined> => {
  const q = 'SELECT image_url FROM PHOTOS.PHOTO WHERE ID = $1';
  const client = await pool.connect();
  try {
    const urlResult = await client.query(q, [image_id]);
    const url = urlResult.rows[0];
    return url?.image_url;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting image URL');
  } finally {
    client.release();
  }
};
