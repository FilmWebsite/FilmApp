import { pool } from '@film/postgres-api';
import { QueryResult } from 'pg';

// Local Types
interface PhotoUrl {
  image_url: string;
}

type PhotoUrlControllerResponse = PhotoUrl[];

// Make the function type-safe
export const PhotoUrlController =
  async (): Promise<PhotoUrlControllerResponse> => {
    const client = await pool.connect();
    try {
      // Query for photo urls
      const q = 'SELECT image_url FROM PHOTOS.PHOTO';
      const data: QueryResult<PhotoUrl> = await client.query(q);

      // Extract data from results
      const rows: PhotoUrl[] = data.rows;

      return rows;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting store data');
    } finally {
      client.release();
    }
  };
