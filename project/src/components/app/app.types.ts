import { AuthorizationStatus } from '../private-route/private-route.constants';

export type Review = {
  id: number;
  author: string;
  text: string;
  date: Date;
  rate: number;
};

export type UserDataType = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
};

export type CommentType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type FilmItemType = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type FilmItem = {
  id: number;
  imgSrc: string;
  posterSrc?: string;
  name: string;
  genre?: string;
  year?: string;
  description?: string;
  director?: string;
  cast?: string;
  runtime?: string;
  reviews?: Review[];
};

export type Props = {
  films: FilmItemType[];
  authorizationStatus?: AuthorizationStatus;
};
