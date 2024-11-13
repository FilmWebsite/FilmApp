export type CollectionType =
  | 'nyc'
  | 'landmarks'
  | 'qt'
  | 'grenada'
  | 'hu'
  | 'nightout'
  | 'jamaica'
  | 'grad'
  | 'crib'
  | 'bbq'
  | 'amy'
  | 'all';

export interface FirebasePhotoMetadata {
  collection: string | string[];
  firebaseStorageDownloadTokens: any;
  home_display: boolean;
  name: string;
}

export type Photo = {
  url: string;
  metadata: FirebasePhotoMetadata;
};

type ColorType = {
  textColor: string;
  shadowColor: string;
};

export type Collection = {
  id: CollectionType | string;
  ref: string;
  display_name?: string;
  colors: ColorType;
  card_name: string;
  desc?: string;
  cover_image: string;
};

export type P = Photo[];
