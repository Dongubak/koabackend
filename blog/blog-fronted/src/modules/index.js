import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import courses, { coursesSaga } from './courses';
import cart, { cartSaga } from './cart';
import comments, { commentsSaga } from './comments';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  courses,
  cart,
  comments
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), 
    postSaga(), postsSaga(), coursesSaga(),
    cartSaga(), commentsSaga()
  ]);
}

export default rootReducer;