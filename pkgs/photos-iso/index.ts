export type CollectionType = 'NYC' | 'landmarks' | 'qt' | 'grenada';

export type Photo = {
  image_url: string;
  id: string;
  collection: CollectionType;
  home_display: boolean;
};

export type Collection = {
  name: string;
  cover: string;
  path: string;
  ref: CollectionType;
  display_name: string;
};

export interface P {
  getPhotos: Photo[];
}

export interface C {
  getCollections: Collection[];
}
