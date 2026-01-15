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
  ref: CollectionType;
  display_name?: string;
  colors: ColorType;
  card_name: string;
  desc?: string;
  cover_image: string;
};

export type P = Photo[];

export interface CollectionFormData {
  card_name: string | null;
  text_color: string | null;
  shadow_color: string | null;
  display_name: string | null;
  desc: string | null;
}
