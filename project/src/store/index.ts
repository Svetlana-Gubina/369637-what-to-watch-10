import { configureStore } from '@reduxjs/toolkit';
import simpleReducer from './reducer';
import { createApi } from '../api/index';

export const api = createApi();

export const store = configureStore({
  reducer: simpleReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
