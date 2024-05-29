import { GQLContext } from '../GQLContext';

export const QueryResolver = {
  async getPhotoTest(_root: {}, args: {}, context: GQLContext) {
    try {
      // Filter Business within zip code
      const p = context.photos.getData();
      console.log('hi');
      return p;
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  },
};
