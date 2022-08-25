import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction<string>('films/redirectToRoute');
export const clearCommentState = createAction('comment/clearState');
export const clearFaviriteState = createAction('favorite/clearState');
