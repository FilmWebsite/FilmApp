import { PostgresPhotoStore } from './../stores/PostgresPhotoStore';

export class PhotoLoader {
  private store: PostgresPhotoStore;

  constructor(store: PostgresPhotoStore) {
    this.store = store;
  }

  getStores = async (): Promise<any> => {
    try {
      return await this.store.getPhotos();
    } catch (error) {
      throw new Error('Failed to get photos');
    }
  };

  getCollections = async (): Promise<any> => {
    try {
      return await this.store.getCollections();
    } catch (error) {
      throw new Error('Failed to get collections');
    }
  };
}
