import { createAction, handleActions } from 'redux-actions';

const INSERT_COURSE = 'cart/INSERT_COURSE';
const DELETE_COURSE = 'cart/DELETE_COURSE';
const UNLOAD = 'cart/UNLOAD_CART'

export const insertCourse = createAction(INSERT_COURSE, course => course);
export const deleteCourse = createAction(DELETE_COURSE, course => course);
export const unloadCart = createAction(UNLOAD);

const initialState = {
  cart: []
};

export default handleActions(
  {
    [INSERT_COURSE]: (state, { payload: course }) => ({
      ...state,
      cart: [...state.cart, course],
    }),
    [DELETE_COURSE]: (state, { payload: course }) => ({
      ...state,
      cart: state.cart.filter(item => item.id !== course.id),  // course.id가 일치하는 항목 제거
    }),
    [UNLOAD]: () => initialState,
  },
  initialState,
);