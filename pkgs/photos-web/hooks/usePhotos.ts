import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
// FIXME: remove .js extension
import { GET_PHOTOS, GET_COLLECTIONS } from '../mutations/index.js';
import { P, C, Photo } from '@film/photos-iso';

export function usePhotos() {
  const { loading, error, data } = useQuery<P>(GET_PHOTOS);

  const { data: collections } = useQuery<C>(GET_COLLECTIONS);

  const returnCollections = useCallback(() => {
    if (collections && collections.getCollections) {
      return collections.getCollections;
    } else {
      return [];
    }
  }, [collections]);

  const filterHomeDisplay = useCallback(() => {
    if (data && data.getPhotos) {
      return data.getPhotos.filter(
        (photo: Photo) => photo.home_display === true
      );
    } else {
      return [];
    }
  }, [data]);

  const filterNYCPhotos = useCallback(() => {
    if (data && data.getPhotos) {
      return data.getPhotos.filter(
        (store: Photo) => store.collection === 'NYC'
      );
    } else {
      return [];
    }
  }, [data]);

  return {
    nyc: filterNYCPhotos(),
    collections: returnCollections(),
    homePhotos: filterHomeDisplay(),
  };
}