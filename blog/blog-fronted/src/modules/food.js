import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as foodAPI from '../lib/api/food';
import { takeLatest } from 'redux-saga/effects';

const [
   SERACH_FOOD,
   SERACH_FOOD_SUCCESS,
   SEARCH_FOOD_FAILURE
 ] = createRequestActionTypes('food/SEARCH_FOOD');

export const searchFood = createAction(
   SERACH_FOOD,
   (keyword) => keyword,
);


const searchFoodSaga = createRequestSaga(SERACH_FOOD, foodAPI.searchFood);

export function* FoodSaga() {
   yield takeLatest(SERACH_FOOD, searchFoodSaga);
}

const initialState = {
   data: '',
   error: false,
   errorMSG: '',
}

const food = handleActions(
   {
     [SERACH_FOOD_SUCCESS]: (state, { payload: response }) => ({
         ...state,
         error: false,
       data: response
     }),

     [SEARCH_FOOD_FAILURE]: (state, { payload: error }) => ({
      error: true,
      errorMSG: error
     })
   },
   initialState,
 );

 export default food;