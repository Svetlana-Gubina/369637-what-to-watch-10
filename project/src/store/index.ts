import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './films';
import userReducer from './user';
import favoritesReducer from './favorite';
import commentReducer from './comment';
import { createApi } from '../api/index';

export const api = createApi();

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    user: userReducer,
    favorites: favoritesReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
