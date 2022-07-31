import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import type { FilmItemType } from '../components/app/app.types';
import { GENRES } from '../components/catalog/catalog.constants';
import { setAllFimlsAction, chooseGenreAction } from './action';
import { getFilmsByGenre } from '../components/catalog/catalog.constants';

type State = {
  genre: string;
  filmsByGenre: FilmItemType[];
  films: FilmItemType[];
};

const initialState: State = {
  genre: GENRES[0],
  filmsByGenre: [],
  films: [],
};

export const simpleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setAllFimlsAction,
      (state, action: PayloadAction<FilmItemType[]>) => {
        state.films = action.payload;
        state.filmsByGenre = action.payload;
      }
    )
    .addCase(chooseGenreAction, (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.filmsByGenre = getFilmsByGenre(state.films, action.payload);
    });
});

export default simpleReducer;
