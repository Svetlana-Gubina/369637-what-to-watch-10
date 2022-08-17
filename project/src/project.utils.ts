import type { FilmItemType } from './types';
import { api } from './store';
import { ApiRoute } from './api/constants';

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
    .then((res) => {
      setFilmStatus(res.data.isFavorite);
      setIsFilmStatusUpdateError(false);
    })
    .catch((err) => {
      setIsFilmStatusUpdateError(true);
    });
};
