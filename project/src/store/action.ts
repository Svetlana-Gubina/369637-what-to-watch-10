import { createAction } from '@reduxjs/toolkit';
import type { FilmItemType } from '../components/app/app.types';

export const setAllFimlsAction = createAction<FilmItemType[]>('films/setAll');
export const chooseGenreAction = createAction<string>('films/chooseGenre');
// export const loadFilmsAction = createAction<FilmItemType[]>('films/setAll');
