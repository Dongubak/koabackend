import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { take, takeLatest } from 'redux-saga/effects';

const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

const decodeHtml = (html) => {
  const text = document.createElement('textarea');
  text.innerHTML = html;
  return text.value;
};

const transformBody = (body) => {
  return decodeHtml(body)
    .replace(/<div class="ql-code-block-container"[^>]*>/g, '<pre><code>')
    .replace(/<\/div><div class="ql-code-block">/g, '\n')
    .replace(/<div class="ql-code-block">/g, '')
    .replace(/<\/div><\/div>/g, '</code></pre>')
    .replace(/<pre class="ql-syntax"[^>]*>/g, '<pre><code>')
    .replace(/<\/pre>/g, '</code></pre>');
};

function* handleReadPostSuccess(action) {
  const decoded = yield transformBody(action.payload.body);
  yield console.log({
    decoded
  });
}


const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(READ_POST_SUCCESS, handleReadPostSuccess);
}



const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => {
      console.log(post);
      return {
      ...state,
      post : {
        ...post,
        body: transformBody(post.body)
      }
    }},
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;