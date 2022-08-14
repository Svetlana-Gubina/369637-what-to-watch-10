import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<string>('films/chooseGenre');
export const clearCommentState = createAction('comment/clearState');
export const clearFaviriteState = createAction('favorite/clearState');
