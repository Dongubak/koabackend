import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as coursesAPI from '../lib/api/courses';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_COURSES,
  LIST_COURSES_SUCCESS,
  LIST_COURSES_FAILURE,
] = createRequestActionTypes('courses/LIST_COURSES');
const UNLOAD_COURSES = 'courses/UNLOAD_COURSES'; // courses페이지에서 벗어날 때 없앰

export const listCourses = createAction(
   LIST_COURSES,
  ({ professor, course_name, page }) => ({ professor, course_name, page }),
);

export const unloadCourses = createAction(UNLOAD_COURSES);

const listCoursesSaga = createRequestSaga(LIST_COURSES, coursesAPI.listCourses);
export function* coursesSaga() {
  yield takeLatest(LIST_COURSES, listCoursesSaga);
}

const initialState = {
  courses: null,
  error: null,
  lastPage: 1,
};

const courses = handleActions(
  {
    [LIST_COURSES_SUCCESS]: (state, { payload: courses }) => ({
      ...state,
      courses,
      error: null,
    }),
    [LIST_COURSES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_COURSES]: () => initialState,
  },
  initialState,
);

export default courses;