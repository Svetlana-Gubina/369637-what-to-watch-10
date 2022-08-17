import { createSlice } from '@reduxjs/toolkit';
import { addComment } from '../async-action';
import { clearCommentState } from '../action';

// a type for the slice state
type CommentState = {
  isCommentSuccess: boolean;
  isCommentError: boolean;
};

// the initial state using that type
const initialState: CommentState = {
  isCommentSuccess: false,
  isCommentError: false,
};

export const commentSlice = createSlice({
  name: 'comment',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addComment.fulfilled, (state) => {
        state.isCommentSuccess = true;
      })
      .addCase(addComment.rejected, (state) => {
        state.isCommentError = true;
      })
      .addCase(clearCommentState, (state) => {
        state.isCommentSuccess = false;
        state.isCommentSuccess = false;
      });
  },
});

export default commentSlice.reducer;
