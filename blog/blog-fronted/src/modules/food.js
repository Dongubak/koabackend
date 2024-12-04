import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as foodAPI from '../lib/api/food';
import { takeLatest, call, put } from 'redux-saga/effects';

const [
  SEARCH_FOOD,
  SEARCH_FOOD_SUCCESS,
  SEARCH_FOOD_FAILURE,
] = createRequestActionTypes('food/SEARCH_FOOD');

export const searchFood = createAction(SEARCH_FOOD, (keyword) => keyword);

const searchFoodSaga = createRequestSaga(SEARCH_FOOD, foodAPI.searchFood);

export function* FoodSaga() {
  yield takeLatest(SEARCH_FOOD, searchFoodSaga);
}

const initialState = {
  data: [],
  error: false,
  errorMSG: '',
};

const food = handleActions(
  {
    [SEARCH_FOOD_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      data: response,
    }),

    [SEARCH_FOOD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMSG: error,
    }),
  },
  initialState,
);

export default food;
