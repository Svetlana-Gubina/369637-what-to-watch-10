import type { FilmItemType } from '../app/app.types';

export const GENRES = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids and Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];

export const FILMS_TO_SHOW = 8;
export const INITIAL_COUNT = 1;

export const getFilmsByGenre = (films: FilmItemType[], genreName: string) =>
  genreName === GENRES[0]
    ? films
    : films.filter(({ genre }) => genre === genreName);
