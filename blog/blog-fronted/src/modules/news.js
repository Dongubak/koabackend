import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as newsAPI from '../lib/api/news';
import { takeLatest, call, put } from 'redux-saga/effects';

const [
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
] = createRequestActionTypes('news/GET_NEWS');

export const getNews = createAction(GET_NEWS);

const getNewsSaga = createRequestSaga(GET_NEWS, newsAPI.getNews);

export function* NewsSaga() {
  yield takeLatest(GET_NEWS, getNewsSaga);
}

const initialState = {
  data: [],
  error: false,
  errorMSG: '',
};

const news = handleActions(
  {
    [GET_NEWS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      data: response.results,
    }),

    [GET_NEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMSG: error,
    }),
  },
  initialState,
);

export default news;
