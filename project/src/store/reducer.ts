import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import type { FilmItemType } from '../components/app/app.types';
import { GENRES } from '../components/catalog/catalog.constants';
import { chooseGenreAction } from './action';
import { getFilmsByGenre } from '../components/catalog/catalog.constants';
import { fetchAllFilms } from './async-action';

type State = {
  genre: string;
  filmsByGenre: FilmItemType[];
  films: FilmItemType[];
  dataLoaded: FilmItemType[];
};

const initialState: State = {
  genre: GENRES[0],
  filmsByGenre: [],
  films: [],
  dataLoaded: [],
};

export const simpleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseGenreAction, (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.filmsByGenre = getFilmsByGenre(state.films, action.payload);
    })
    .addCase(
      fetchAllFilms.fulfilled,
      (state, action: PayloadAction<FilmItemType[]>) => {
        state.dataLoaded = action.payload;
      }
    );
});

export default simpleReducer;
