import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

// 액션 타입 생성
const [
  LIST_COMMENTS,
  LIST_COMMENTS_SUCCESS,
  LIST_COMMENTS_FAILURE,
] = createRequestActionTypes('comments/LIST_COMMENTS');

const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comments/WRITE_COMMENT');

const [
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
] = createRequestActionTypes('comments/UPDATE_COMMENT');

const [
  REMOVE_COMMENT,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
] = createRequestActionTypes('comments/REMOVE_COMMENT');

// 액션 생성자 설정
export const listComments = createAction(
  LIST_COMMENTS,
  ({ post_id, page, per_page }) => ({ post_id, page, per_page }),
);

export const writeComment = createAction(
  WRITE_COMMENT,
  ({ post_id, user_id, text }) => ({ post_id, user_id, text }),
);

export const updateComment = createAction(
  UPDATE_COMMENT,
  ({ comment_id, text }) => ({ comment_id, text }),
);

export const removeComment = createAction(REMOVE_COMMENT, comment_id => comment_id);

// 사가 생성
const listCommentsSaga = createRequestSaga(LIST_COMMENTS, commentsAPI.listComments);
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, commentsAPI.writeComments);
const updateCommentSaga = createRequestSaga(UPDATE_COMMENT, commentsAPI.updateComments);
const removeCommentSaga = createRequestSaga(REMOVE_COMMENT, commentsAPI.removeComment);

export function* commentsSaga() {
  yield takeLatest(LIST_COMMENTS, listCommentsSaga);
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
  yield takeLatest(REMOVE_COMMENT, removeCommentSaga);
}

// 초기 상태 설정
const initialState = {
  comments: null,
  error: null,
  lastPage: 1,
};

// 리듀서 설정
const comments = handleActions(
  {
    [LIST_COMMENTS_SUCCESS]: (state, action) => {
      const { comments, total_pages } = action.payload; // payload에서 필요한 데이터를 꺼냄
      return {
        ...state,
        comments,  // comments 배열을 상태에 저장
        lastPage: total_pages,  // total_pages를 lastPage에 저장
      };
    },
    [LIST_COMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comments: state.comments ? state.comments.concat(comment) : [comment],
    }),
    [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_COMMENT_SUCCESS]: (state, { payload: updatedComment }) => ({
      ...state,
      comments: state.comments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    }),
    [UPDATE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_COMMENT_SUCCESS]: (state, { payload: comment_id }) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== comment_id),
    }),
    [REMOVE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default comments;