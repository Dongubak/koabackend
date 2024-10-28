import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as meetingsAPI from '../lib/api/meetings';
import { takeLatest } from 'redux-saga/effects';

const [
  INIT_MEETINGS,
  INIT_MEETINGS_SUCCESS,
  INIT_MEETINGS_FAILURE,
] = createRequestActionTypes('meetings/INIT_MEETINGS');
const UNLOAD_MEETINGS = 'meetings/UNLOAD_MEETINGS'; // courses페이지에서 벗어날 때 없앰

const [
  LIST_GROUP_TIMETABLES,
  LIST_GROUP_TIMETABLES_SUCCESS,
  LIST_GROUP_TIMETABLES_FAILURE,
] = createRequestActionTypes('meetings/LIST_GROUP_TIMETABLES');
const UNLOAD_LIST_GROUP_TIMETABLES = 'meetings/UNLOAD_LIST_GROUP_TIMETABLES'; 

const [
  SEARCH_USERNAME,
  SEARCH_USERNAME_SUCCESS,
  SEARCH_USERNAME_FAILURE,
] = createRequestActionTypes('meetings/SEARCH_USERNAME');
const UNLOAD_SEARCH_USERNAME = 'meetings/UNLOAD_SEARCH_USERNAME';


export const initMeetings = createAction(
   INIT_MEETINGS,
  (user_id) => user_id,
);

export const listGroupTimeTable = createAction(
  LIST_GROUP_TIMETABLES,
  ({group_id, user_id}) => {
    console.log(`redux : ${user_id}`);
    return {
      group_id, user_id
    }
  },
)

export const searchUsername = createAction(
  SEARCH_USERNAME,
  (keyword) => {
    console.log(`redux : ${keyword}`);
    return keyword
  },
)

export const unloadMeetings = createAction(UNLOAD_MEETINGS);
export const unloadGroupTimeTable = createAction(UNLOAD_LIST_GROUP_TIMETABLES);
export const unloadSearchUsername = createAction(UNLOAD_SEARCH_USERNAME);

const initMeetingsSaga = createRequestSaga(INIT_MEETINGS, meetingsAPI.initMeetings);
const listGroupTimeTableSaga = createRequestSaga(LIST_GROUP_TIMETABLES, meetingsAPI.listGroupTimeTable);

/// TODO
const searchUsernameSaga = createRequestSaga(SEARCH_USERNAME, meetingsAPI.searchUsername);

export function* MeetingsSaga() {
  yield takeLatest(INIT_MEETINGS, initMeetingsSaga);
  yield takeLatest(LIST_GROUP_TIMETABLES, listGroupTimeTableSaga);
  yield takeLatest(SEARCH_USERNAME, searchUsernameSaga);
}

const initialState = {
  error: false,
  errorMsg: '',
  groups: [],
  groupsTimetable: [],
  isOwner: false,
  userDatas: []
};

const meetings = handleActions(
  {
    [INIT_MEETINGS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      errorMsg: '',
      ...response
    }),
    [INIT_MEETINGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMsg: error
    }),
    [UNLOAD_MEETINGS]: () => initialState,

    [LIST_GROUP_TIMETABLES_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      errorMsg: '',
      ...response
      /**
       * message : 성공여부
       * isOwner: 오너 여부
       * groupsTimetable: [{user_id, username, courses: []}, {...}]
       */
    }),
    [LIST_GROUP_TIMETABLES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMsg: error
    }),
    [UNLOAD_LIST_GROUP_TIMETABLES]: () => initialState,

    [SEARCH_USERNAME_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      errorMsg: '',
      ...response
      /**
       * message : 성공여부
       * isOwner: 오너 여부
       * groupsTimetable: [{user_id, username, courses: []}, {...}]
       */
    }),
    [SEARCH_USERNAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMsg: error
    }),
    [UNLOAD_SEARCH_USERNAME]: () => initialState,
  },
  initialState,
);

export default meetings;