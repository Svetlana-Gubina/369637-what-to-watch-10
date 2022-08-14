import type { FilmItemType } from './components/app/app.types';

export const shuffleFilms = (arr: FilmItemType[]) => {
  const inner = arr.slice();

  for (let i = 0; i < inner.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [inner[i], inner[randomIndex]] = [inner[randomIndex], inner[i]];
  }
  return inner;
};

export const getCurrentFilm = (
  films: FilmItemType[],
  searchId: string | undefined
) => films.find((film) => film.id.toString() === searchId);
