import type { FilmItemType } from '../../types';

export const GENRES = [
  'All genres',
  'Comedy',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids and Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
  // ['Comedy', 'Crime', 'Adventure', 'Comedy', 'Adventure', 'Comedy', 'Adventure', 'Drama', 'Drama', 'Adventure', 'Thriller', 'Action', 'Adventure', 'Crime', 'Drama', 'Crime', 'Action', 'Drama', 'Drama', 'Action', 'Action', 'Fantasy', 'Crime', 'Drama', 'Crime']
];

export const FILMS_TO_SHOW = 8;
export const INITIAL_COUNT = 1;

export const getFilmsByGenre = (films: FilmItemType[], genreName: string) =>
  genreName === GENRES[0]
    ? films
    : films.filter(({ genre }) => genre === genreName);
