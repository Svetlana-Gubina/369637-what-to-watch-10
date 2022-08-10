import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../components/app/app.types';
// import type { RootState } from '../store.types';

// Define a type for the slice state
type FavoriteState = {
  favorites: FilmItemType[];
};

// Define the initial state using that type
const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { } = favoriteSlice.actions;

export default favoriteSlice.reducer;
