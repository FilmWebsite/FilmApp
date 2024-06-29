import { gql } from '@apollo/client';

export const GET_PHOTOS = gql`
  query GetPhotos {
    getPhotos {
      collection
      home_display
      id
      image_url
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections {
    getCollections {
      cover
      name
      path
      ref
    }
  }
`;
