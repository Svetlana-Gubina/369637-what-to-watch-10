import { createAction } from '@reduxjs/toolkit';

export const redirectTiRoute = createAction<string>('films/redirectToRoute');
export const clearCommentState = createAction('comment/clearState');
export const clearFaviriteState = createAction('favorite/clearState');
