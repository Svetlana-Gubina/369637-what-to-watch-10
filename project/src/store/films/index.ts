import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../components/app/app.types';
import { fetchAllFilms, fetchPromo, fetchFilmDataById } from '../async-action';

// a type for the slice state
type FilmsState = {
  isFilmDataLoaded: boolean;
  isPromoDataLoaded: boolean;
  filmDataError: boolean;
  promoDataError: boolean;
  films: FilmItemType[];
  promo: FilmItemType | null;
  activeFilmData: FilmItemType | null;
};

// the initial state using that type
const initialState: FilmsState = {
  filmDataError: false,
  promoDataError: false,
  isFilmDataLoaded: false,
  isPromoDataLoaded: false,
  films: [],
  promo: null,
  activeFilmData: null,
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
      )
      .addCase(
        fetchFilmDataById.fulfilled,
        (state, action: PayloadAction<FilmItemType>) => {
          state.activeFilmData = action.payload;
        }
      );
  },
});

export default filmsSlice.reducer;
