import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../components/app/app.types';
import { fetchFavoriteFilms } from '../async-action';
// import type { RootState } from '../store.types';

// a type for the slice state
type FavoriteState = {
  favorites: FilmItemType[];
};

// the initial state using that type
const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchFavoriteFilms.fulfilled,
      (state, action: PayloadAction<FilmItemType[]>) => {
        state.favorites = action.payload;
      }
    );
  },
});

export default favoriteSlice.reducer;
