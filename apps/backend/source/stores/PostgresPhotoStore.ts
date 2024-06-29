import { Pool } from 'pg';

export class PostgresPhotoStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  returnAllPhotosQuery = `SELECT * FROM photos.photo`;
  returnCollectionsQuery = `SELECT * FROM photos.collection`;
  async getPhotos() {
    try {
      const results = await this.pool.query(this.returnAllPhotosQuery);
      const photos = results.rows;

      return photos;
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error getting photos');
      return []; // or throw error as needed
    }
  }

  async getCollections() {
    try {
      const results = await this.pool.query(this.returnCollectionsQuery);
      const collections = results.rows;

      return collections;
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error getting collections');
      return []; // or throw error as needed
    }
  }
}
