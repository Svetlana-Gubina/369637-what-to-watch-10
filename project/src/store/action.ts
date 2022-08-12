import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<string>('films/chooseGenre');
