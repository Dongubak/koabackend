import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { put, takeLatest, call } from 'redux-saga/effects';
import { listPosts, listPostsWithoutRemovedOne } from './posts';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const SET_INVALID_FIELD = 'write/SET_INVALID_FIELD';
const INIT_SUBJECT = 'write/INIT_SUBJECT';

const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST'); // 포스트 작성

const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST'); // 포스트 수정

const [
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
] = createRequestActionTypes('write/REMOVE_POST'); // 포스트 삭제


export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, user_id, subject }) => ({
  title,
  body,
  user_id,
  subject
}));
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body }) => ({
    id,
    title,
    body
  }),
);
export const removePost = createAction(REMOVE_POST, ({navigate, id}) => ({navigate, id}));

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);

export const setInvalidField = createAction(SET_INVALID_FIELD, fieldList => fieldList);

export const initSubject = createAction(INIT_SUBJECT, (subject) => subject);

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
const removePostSaga = createRequestSaga(REMOVE_POST, postsAPI.removePost);

function* handleRemovePostSuccess({payload : id}) {
  try {
    // 여기에 포스트 삭제 이후 수행할 작업을 추가합니다.
    yield put(listPostsWithoutRemovedOne(id));
  } catch (e) {
    console.error(e);
  }
}

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
  yield takeLatest(REMOVE_POST_SUCCESS, handleRemovePostSuccess); // 삭제 성공 후 처리
}

const initialState = {
  title: '',
  body: '',
  subject: '',
  post: null,
  postError: null,
  removeError: null,  // 삭제 오류 상태 추가
  invalidField: [],
};

const write = handleActions(
  {
    [INITIALIZE]: _ => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [SET_INVALID_FIELD]: (state, { payload }) => ({
      ...state,
      invalidField: payload
    }),
    [WRITE_POST]: state => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, {payload: post}) => ({
      ...state,
      title: post.title,
      body: post.body,
      originalPostId: post.id,
      subject: post.subject
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [REMOVE_POST_SUCCESS]: (state, { payload: id }) => {
      return {
        ...state,
        removeError: null,
      }
    },
    [REMOVE_POST_FAILURE]: (state, { payload: removeError }) => ({
      ...state,
      removeError,
    }),
    [INIT_SUBJECT]: (state, {payload: subject}) => {
      console.log(subject);
      return {
        ...state,
        subject,
      }
    }
   },
  initialState,
);

export default write;