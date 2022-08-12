import { configureStore } from '@reduxjs/toolkit';
// import simpleReducer from './reducer';
import filmsReducer from './films';
import commentsReducer from './comments';
import userReducer from './user';
import favoritesReducer from './favorite';
import { createApi } from '../api/index';

export const api = createApi();

export const store = configureStore({
  // reducer: simpleReducer,
  reducer: {
    films: filmsReducer,
    comments: commentsReducer,
    user: userReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
