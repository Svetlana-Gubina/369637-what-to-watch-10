import type { FilmItemType } from '../app/app.types';
import { shuffleFilms } from '../../project.utils';
import { LIMIT } from './main-layout.constants';

export const getSimilarFilms = (
  films: FilmItemType[],
  currentFilm?: FilmItemType
): FilmItemType[] => {
  if (!currentFilm) {
    return shuffleFilms(films).slice(0, LIMIT);
  }
  return shuffleFilms(films)
    .filter(({ id }) => id !== currentFilm.id)
    .slice(0, LIMIT);
};
