import { PostgresPhotoStore } from '../stores';

export class PhotoLoader {
  private store: PostgresPhotoStore;

  constructor(store: PostgresPhotoStore) {
    this.store = store;
  }

  getData = async (): Promise<any> => {
    try {
      return await this.store.getPhotos();
    } catch (error) {
      throw new Error('Failed to get stores');
    }
  };
}
