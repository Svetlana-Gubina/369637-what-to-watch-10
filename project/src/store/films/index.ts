import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmItemType } from '../../components/app/app.types';
// import type { RootState } from '../store.types';

// Define a type for the slice state
type FillmsState = {
  films: FilmItemType[];
};

// Define the initial state using that type
const initialState: FillmsState = {
  films: [],
};

export const filmsSlice = createSlice({
  name: 'films',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { } = filmsSlice.actions;

export default filmsSlice.reducer;
