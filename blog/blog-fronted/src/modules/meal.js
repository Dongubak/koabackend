import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as mealAPI from '../lib/api/meal';
import { takeLatest, call, put } from 'redux-saga/effects';

const [
  GET_MEAL,
  GET_MEAL_SUCCESS,
  GET_MEAL_FAILURE,
] = createRequestActionTypes('meal/GET_MEAL');

export const getMeal = createAction(GET_MEAL, (keyword) => keyword);

const getMealSaga = createRequestSaga(GET_MEAL, mealAPI.getMeal);

export function* MealSaga() {
  yield takeLatest(GET_MEAL, getMealSaga);
}

const initialState = {
  data: [],
  error: false,
  errorMSG: '',
};

const meal = handleActions(
  {
    [GET_MEAL_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      data: response,
    }),

    [GET_MEAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMSG: error,
    }),
  },
  initialState,
);

export default meal;
