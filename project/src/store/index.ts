import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './films';
import userReducer from './user';
import commentReducer from './comment';
import { createApi } from '../api/index';

export const api = createApi();

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    user: userReducer,
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
