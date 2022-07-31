import { configureStore } from '@reduxjs/toolkit';
import simpleReducer from './reducer';

export const store = configureStore({ reducer: simpleReducer });
