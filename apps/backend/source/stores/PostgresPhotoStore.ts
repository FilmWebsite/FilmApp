import { Pool } from 'pg';
import { GetLatLngByAddress } from '@geocoder-free/google';

export class PostgresPhotoStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  getBusinessQuery = `SELECT current_database();`;
  async getPhotos() {
    try {
      const results = await this.pool.query(this.getBusinessQuery);
      const photos = results.rows;

      return photos;
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error getting business list');
      return []; // or throw error as needed
    }
  }
}
