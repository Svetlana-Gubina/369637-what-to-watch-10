import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../types';
import type { FilmsState } from '../../types/store';
import { fetchAllFilms, fetchPromo } from '../async-action';

// the initial state using that type
const initialState: FilmsState = {
  filmDataError: false,
  promoDataError: false,
  isFilmDataLoaded: false,
  isPromoDataLoaded: false,
  films: [],
  promo: null,
};

export const filmsSlice = createSlice({
  name: 'films',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchAllFilms.fulfilled,
        (state, action: PayloadAction<FilmItemType[]>) => {
          state.films = action.payload;
          state.isFilmDataLoaded = true;
        }
      )
      .addCase(fetchAllFilms.rejected, (state) => {
        state.filmDataError = true;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.promoDataError = true;
      })
      .addCase(
        fetchPromo.fulfilled,
        (state, action: PayloadAction<FilmItemType>) => {
          state.promo = action.payload;
          state.isPromoDataLoaded = true;
        }
      );
  },
});

export default filmsSlice.reducer;
