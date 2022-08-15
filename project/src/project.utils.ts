import type { FilmItemType } from './components/app/app.types';
import { api } from './store';
import { ApiRoute } from './api/constants';

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

export const handleFilmStateUpdate = (
  evt:
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLButtonElement>,
  filmId: number | undefined,
  filmStatus: boolean,
  setFilmStatus: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFilmStatusUpdateError: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  evt.preventDefault();

  if (!filmId) {
    return;
  }
  api
    .post(`${ApiRoute.Favorite}/${filmId}/${Number(!filmStatus)}`)
    .then((res) => setFilmStatus(res.data.isFavorite))
    .catch((err) => {
      setIsFilmStatusUpdateError(true);
    });
};
