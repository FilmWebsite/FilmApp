import { GQLContext } from '../GQLContext';

export const QueryResolver = {
  async getPhotos(_root: {}, args: {}, context: GQLContext) {
    try {
      // Filter Business within zip code
      const photos = context.photos.getStores();
      return photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  },

  async getCollections(_root: {}, args: {}, context: GQLContext) {
    try {
      // Filter Business within zip code
      const collections = context.photos.getCollections();
      return collections;
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  },
};
