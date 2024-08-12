import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as cartAPI from '../lib/api/cart';
import { put, take, takeLatest } from 'redux-saga/effects';


const INSERT_COURSE = 'cart/INSERT_COURSE';
const DELETE_COURSE = 'cart/DELETE_COURSE';
const UNLOAD = 'cart/UNLOAD_CART';

const [
  LOAD_CART,
  LOAD_CART_SUCCESS,
  LOAD_CART_FAILURE,
] = createRequestActionTypes('cart/LOAD_CART');

const [
  SAVE_CART,
  SAVE_CART_SUCCESS,
  SAVE_CART_FAILURE,
] = createRequestActionTypes('cart/SAVE_CART');


export const insertCourse = createAction(INSERT_COURSE, course => course);
export const deleteCourse = createAction(DELETE_COURSE, course_name => course_name);

// export const deleteCourse = createAction(DELETE_COURSE, course => course);
export const unloadCart = createAction(UNLOAD);

export const loadCart = createAction(
  LOAD_CART,
  (user_id) => (user_id)
);

export const saveCart = createAction(SAVE_CART, (user_id, course_ids) => ({user_id, course_ids}));


const loadCartSaga = createRequestSaga(LOAD_CART, cartAPI.loadCart);
const saveCartSage = createRequestSaga(SAVE_CART, cartAPI.saveCart);

function* loadFailureSaga() { /// 적절한 유저 아니면 로컬 스토리지에서 user제거
  try {
    yield localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
  yield put(unloadCart());
}

export function* cartSaga() {
  yield takeLatest(LOAD_CART, loadCartSaga);
  yield takeLatest(LOAD_CART_FAILURE, loadFailureSaga);
  yield takeLatest(SAVE_CART, saveCartSage);
}

const initialState = {
  cart: [],
  error: null,
};

function parseClassTimeToDict(classTime) {
    const result = {};
    const dayPattern = /([A-Z][a-z]{2}):?(\d+(?:,\d+)*)?/g;
    let match;

    while ((match = dayPattern.exec(classTime)) !== null) {
        const day = match[1];  // 요일 (예: Mon)
        const hours = match[2] ? match[2].split(',').map(Number) : [];  // 시간 리스트

        if (result[day]) {
            result[day] = result[day].concat(hours);
        } else {
            result[day] = hours;
        }
    }

    return result;
}

export default handleActions(
  {
    [INSERT_COURSE]: (state, { payload: course }) => {
      const newSchedule = parseClassTimeToDict(course.class_time);

      const conflictingCourses = state.cart.filter(existingCourse => {
        const existingSchedule = parseClassTimeToDict(existingCourse.class_time);

        // 요일별로 시간 충돌 여부를 확인
        return Object.keys(newSchedule).some(day => {
          return newSchedule[day].some(hour => existingSchedule[day] && existingSchedule[day].includes(hour));
        });
      });

      if (conflictingCourses.length > 0) {
        // 시간 충돌이 있으면 경고 메시지 출력
        const conflictNames = conflictingCourses.map(course => course.course_name).join(', ');
        console.warn('시간이 겹쳐서 추가할 수 없습니다:', conflictNames);
        alert(`시간이 겹쳐서 추가할 수 없습니다. 겹치는 강의: ${conflictNames}`);
        return state;
      }

      // 충돌이 없으면 강의를 추가
      return {
        ...state,
        cart: [...state.cart, course],
      };
    },
    [DELETE_COURSE]: (state, { payload: course_name}) => ({
        ...state,
        cart: state.cart.filter((e) => e.course_name !== course_name)
    }),
    [LOAD_CART_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      cart: response.data,
      error: null,
    }),
    [SAVE_CART_SUCCESS]: (state, {payload: response}) => {
      alert('저장 성공!');
      return {
        cart: response.data,
        error: null
      }
  },
    [UNLOAD]: () => initialState,
  },
  initialState,
);