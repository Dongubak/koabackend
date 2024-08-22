import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest, put, select } from 'redux-saga/effects';
import history from '../lib/util/history';

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

function* handleCommentSuccess(action) {
  console.log('handleRemoveCommentsSuccess');
  const postId = yield select((state) => state.comments.postId);
  yield put(listComments({ post_id: postId, page: 1, per_page: 10 }));
  // const comments = yield select((state) => state.comments.comments);
  // // 페이지를 강제로 1로 설정
  // if(comments.length === 1 && page > 1) {
  //   put(history.push(`?page=${page - 1}`));
  // } else {
  //   put(history.push(`?page=${page + 1}`));
  // }
}
export function* commentsSaga() {
  yield takeLatest(LIST_COMMENTS, listCommentsSaga);
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(WRITE_COMMENT_SUCCESS, handleCommentSuccess);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
  yield takeLatest(UPDATE_COMMENT_SUCCESS, handleCommentSuccess); // 삭제 성공 후 처리
  yield takeLatest(REMOVE_COMMENT, removeCommentSaga);
  yield takeLatest(REMOVE_COMMENT_SUCCESS, handleCommentSuccess); // 삭제 성공 후 처리
}

// 초기 상태 설정
const initialState = {
  comments: null,
  error: null,
  lastPage: 1,
  postId: null,
  page: 1,
};

// 리듀서 설정
const comments = handleActions(
  {
    [LIST_COMMENTS_SUCCESS]: (state, action) => {
      const { comments, total_pages, postId } = action.payload;
      return {
        ...state,
        comments,
        lastPage: total_pages,
        postId
      };
    },
    [LIST_COMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
    }),
    [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_COMMENT_SUCCESS]: (state) => ({
      ...state
    }),
    [UPDATE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_COMMENT_SUCCESS]: (state, { payload: comment_id }) => ({
      ...state,
        comments: state.comments.filter(comment => comment.id !== parseInt(comment_id)),
    }),
    [REMOVE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default comments;