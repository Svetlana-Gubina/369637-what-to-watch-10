import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../components/app/app.types';
import { fetchFavoriteFilms, updateFilmIsFavoriteState } from '../async-action';
import { clearFaviriteState } from '../action';
// import type { RootState } from '../store.types';

// a type for the slice state
type FavoriteState = {
  favorites: FilmItemType[];
  isSuccessUpdate: boolean;
  isErrorUpdate: boolean;
};

// the initial state using that type
const initialState: FavoriteState = {
  favorites: [],
  isSuccessUpdate: false,
  isErrorUpdate: false,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchFavoriteFilms.fulfilled,
        (state, action: PayloadAction<FilmItemType[]>) => {
          state.favorites = action.payload;
        }
      )
      .addCase(updateFilmIsFavoriteState.rejected, (state) => {
        state.isErrorUpdate = true;
      })
      .addCase(updateFilmIsFavoriteState.fulfilled, (state) => {
        state.isSuccessUpdate = true;
      })
      .addCase(clearFaviriteState, (state) => {
        state.isErrorUpdate = false;
        state.isSuccessUpdate = false;
      });
  },
});

export default favoriteSlice.reducer;
