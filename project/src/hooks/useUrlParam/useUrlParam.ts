import type { FilmItemType } from '../../components/app/app.types';
import { useParams } from 'react-router-dom';
import { getCurrentFilm } from '../../project.utils';

function useUrlParam(films: FilmItemType[]) {
  const { id: searchId } = useParams();
  const currentFilm = getCurrentFilm(films, searchId);

  return currentFilm;
}

export default useUrlParam;
