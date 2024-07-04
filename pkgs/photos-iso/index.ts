export type CollectionType = 'nyc' | 'landmarks' | 'qt' | 'grenada' | 'howard';

export type Photo = {
  image_url: string;
  id: string;
  collection: CollectionType;
  home_display: boolean;
};

type ColorType = {
  textColor: string;
  shadowColor: string;
};

export type Collection = {
  id: string;
  name: string;
  cover: string;
  path: string;
  ref: CollectionType;
  display_name: string;
  colors: ColorType;
};

export interface P {
  getPhotos: Photo[];
}

export interface C {
  getCollections: Collection[];
}
