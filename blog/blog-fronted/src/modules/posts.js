import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

const LIST_POSTS_WITHOUT_REMOVED_ONE = 'posts/LIST_POSTS_WITHOUT_REMOVED_ONE';

export const listPosts = createAction(
  LIST_POSTS,
  ({ username, page, subject }) => ({ username, page, subject }),
);

export const listPostsWithoutRemovedOne = createAction(
  LIST_POSTS_WITHOUT_REMOVED_ONE,
  (id) => id
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LIST_POSTS_WITHOUT_REMOVED_ONE]: (state, {payload: id}) => {
      const updatedPosts = state.posts.posts.filter(post => post.id !== id);
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: updatedPosts
        }
      }
    }
  },
  initialState,
);

export default posts;