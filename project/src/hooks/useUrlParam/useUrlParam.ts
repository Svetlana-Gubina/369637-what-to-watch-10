import type { FilmItemType } from '../../components/app/app.types';
import { useParams } from 'react-router-dom';

function useUrlParam(films: FilmItemType[]) {
  const params = useParams();
  const searchId = params.id;
  const currentFilm = films.find((film) => film.id.toString() === searchId);

  return currentFilm;
}

export default useUrlParam;
