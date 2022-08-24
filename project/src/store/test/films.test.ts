import filmsReducer from '../films';
import type { FilmsState } from '../../types/store';
import { fetchAllFilms, fetchPromo } from '../async-action';
import type { FilmItemType } from '../../types/index';

const filmDataMock = [
  {
    id: 1,
    name: 'test',
    director: 'test',
    genre: 'test',
  },
  {
    id: 2,
    name: 'test',
    director: 'test',
    genre: 'test',
  },
] as unknown as FilmItemType[];

const promoDataMock = {
  id: 3,
  name: 'test',
  director: 'test',
  genre: 'test',
} as unknown as FilmItemType;

describe('FilmsReducer tests', () => {
  let state: FilmsState;

  beforeEach(() => {
    state = {
      filmDataError: false,
      promoDataError: false,
      isFilmDataLoaded: false,
      isPromoDataLoaded: false,
      films: [],
      promo: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsReducer(undefined, { type: 'unknown action' })).toEqual(state);
  });

  it('should put fetched promo data to state is case of fetchPromo success response', () => {
    expect(
      filmsReducer(state, {
        type: fetchPromo.fulfilled.type,
        payload: promoDataMock,
      })
    ).toEqual({ ...state, isPromoDataLoaded: true, promo: promoDataMock });
  });

  it('should set promoDataError to true is case error', () => {
    expect(
      filmsReducer(state, {
        type: fetchPromo.rejected.type,
      })
    ).toEqual({ ...state, promoDataError: true });
  });

  it('should put fetched film data to state is case of fetchAllFilms success response', () => {
    expect(
      filmsReducer(state, {
        type: fetchAllFilms.fulfilled.type,
        payload: filmDataMock,
      })
    ).toEqual({ ...state, isFilmDataLoaded: true, films: filmDataMock });
  });

  it('should set filmDataError to true is case error', () => {
    expect(
      filmsReducer(state, {
        type: fetchAllFilms.rejected.type,
      })
    ).toEqual({ ...state, filmDataError: true });
  });
});
