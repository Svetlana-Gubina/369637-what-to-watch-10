import commentReducer from '../comment';
import { addComment } from '../async-action';
import type { CommentState } from '../../types/store';

describe('CommentReducer tests', () => {
  let state: CommentState;

  beforeEach(() => {
    state = { isCommentSuccess: false, isCommentError: false };
  });

  it('without additional parameters should return initial state', () => {
    expect(commentReducer(undefined, { type: 'unknown action' })).toEqual({
      isCommentSuccess: false,
      isCommentError: false,
    });
  });
  it('should clear state', () => {
    expect(commentReducer(state, { type: 'comment/clearState' })).toEqual({
      isCommentSuccess: false,
      isCommentError: false,
    });
  });

  it('should update comments success state to true if addComment action fulfilled', () => {
    expect(commentReducer(state, { type: addComment.fulfilled.type })).toEqual({
      isCommentSuccess: true,
      isCommentError: false,
    });
  });

  it('should update comments error state to true if addComment action rejected', () => {
    expect(commentReducer(state, { type: addComment.rejected.type })).toEqual({
      isCommentSuccess: false,
      isCommentError: true,
    });
  });
});
