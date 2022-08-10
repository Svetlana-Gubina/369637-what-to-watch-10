import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { CommentType } from '../../components/app/app.types';
// import type { RootState } from '../store.types';

// Define a type for the slice state
type CommentsState = {
  comments: CommentType[];
};

// Define the initial state using that type
const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { } = commentsSlice.actions;

export default commentsSlice.reducer;
