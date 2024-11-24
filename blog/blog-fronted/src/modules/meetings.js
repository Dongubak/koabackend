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
const INSERT_USERNAME_TO_CART = 'meetings/INSERT_USERNAME_TO_CART';
const UNLOAD_USERNAME_IN_CART = 'meetings/UNLOAD_USERNAME_IN_CART';
// const CLEAR_SUCCESS_FLAG = 'meetings/CLEAR_SUCCESS_FLAG';

const [
  UPLOAD_MEETING_GROUP,
  UPLOAD_MEETING_GROUP_SUCCESS,
  UPLOAD_MEETING_GROUP_FAILURE,
] = createRequestActionTypes('meetings/UPLOAD_MEETING_GROUP');

const [
  UPDATE_MEETING_GROUP,
  UPDATE_MEETING_GROUP_SUCCESS,
  UPDATE_MEETING_GROUP_FAILURE,
] = createRequestActionTypes('meetings/UPDATE_MEETING_GROUP');

const [
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE
] = createRequestActionTypes('meetings/DELETE_ITEM');

const [
  INIT_MEETING_GROUP,
  INIT_MEETING_GROUP_SUCCESS,
  INIT_MEETING_GROUP_FAILURE,
] = createRequestActionTypes('meetings/INIT_MEETING_GROUP');

const [
  DELETE_MEETING_GROUP,
  DELETE_MEETING_GROUP_SUCCESS,
  DELETE_MEETING_GROUP_FAILURE,
] = createRequestActionTypes('meetings/DELETE_MEETING_GROUP');

const [
  INIT_CART,
  INIT_CART_SUCCESS,
  INIT_CART_FAILURE,
] = createRequestActionTypes('meetings/INIT_CART');

// export const clearSuccessFlag = createAction(CLEAR_SUCCESS_FLAG);

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

export const insertUserToCart = createAction(
  INSERT_USERNAME_TO_CART,
  (userData) => userData
);

export const uploadMeetingGroup = createAction(
  UPLOAD_MEETING_GROUP,
  (data) => data
);

export const updateMeetingGroup = createAction(
  UPDATE_MEETING_GROUP,
  (data) => data
)

export const deleteCartItem = createAction(
  DELETE_ITEM,
  (username) => username
);

export const deleteMeetingGroup = createAction(
  DELETE_MEETING_GROUP,
  (group_id) => group_id
);

export const initCart = createAction(
  INIT_CART,
  (initData) => initData
)

export const unloadMeetings = createAction(UNLOAD_MEETINGS);
export const unloadGroupTimeTable = createAction(UNLOAD_LIST_GROUP_TIMETABLES);
export const unloadSearchUsername = createAction(UNLOAD_SEARCH_USERNAME);
export const unloadUserCart = createAction(UNLOAD_USERNAME_IN_CART);

const initMeetingsSaga = createRequestSaga(INIT_MEETINGS, meetingsAPI.initMeetings);
const listGroupTimeTableSaga = createRequestSaga(LIST_GROUP_TIMETABLES, meetingsAPI.listGroupTimeTable);
const searchUsernameSaga = createRequestSaga(SEARCH_USERNAME, meetingsAPI.searchUsername);
const deleteMeetingGroupSaga = createRequestSaga(DELETE_MEETING_GROUP, meetingsAPI.deleteMeetingGroup);

/// TODO
const uploadMeetingGroupSaga = createRequestSaga(UPLOAD_MEETING_GROUP, meetingsAPI.uploadMeetingGroup);
const updateMeetingGroupSaga = createRequestSaga(UPDATE_MEETING_GROUP, meetingsAPI.updateMeetingGroup);

export function* MeetingsSaga() {
  yield takeLatest(UPLOAD_MEETING_GROUP, uploadMeetingGroupSaga);
  yield takeLatest(LIST_GROUP_TIMETABLES, listGroupTimeTableSaga);
  yield takeLatest(SEARCH_USERNAME, searchUsernameSaga);
  yield takeLatest(INIT_MEETINGS, initMeetingsSaga);
  yield takeLatest(DELETE_MEETING_GROUP, deleteMeetingGroupSaga);
  yield takeLatest(UPDATE_MEETING_GROUP, updateMeetingGroupSaga);
}

const initialState = {
  error: false,
  errorMsg: '',
  groups: [],
  groupsTimetable: [],
  isOwner: false,
  userDatas: [],
  cart: [],
  success: false,
  groupName: '',
  updateFlag: false,
  group_id: '',
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
    }),
    [LIST_GROUP_TIMETABLES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMsg: error
    }),
    [UNLOAD_LIST_GROUP_TIMETABLES]: (state) => ({
      ...state
    }),

    [SEARCH_USERNAME_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      errorMsg: '',
      ...response
    }),
    [SEARCH_USERNAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: true,
      errorMsg: error
    }),
    [UNLOAD_SEARCH_USERNAME]: () => initialState,

    [INSERT_USERNAME_TO_CART]: (state, { payload: cart }) => ({
      ...state,
      error: false,
      cart: state.cart.find((item) => item.id === cart.id) 
        ? state.cart
        : [...state.cart, cart],
    }),
    [UNLOAD_USERNAME_IN_CART]: () => initialState,

    [UPLOAD_MEETING_GROUP_SUCCESS]: (state) => ({
      ...state,
      success: true,
    }),
    [UPLOAD_MEETING_GROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      success: false,
    }),
    [UPDATE_MEETING_GROUP_SUCCESS]: (state) => ({
      ...state,
      success: true,
    }),
    [UPDATE_MEETING_GROUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
      success: false,
    }),
    [DELETE_ITEM]: (state, {payload: username}) => ({
      ...state,
      cart: [...state.cart].filter((item) => item.username !== username)
    }),
    [DELETE_MEETING_GROUP_SUCCESS]: (state, { payload }) => {
      console.log(payload);
      return ({
        ...state,
        groups: [...state.groups].filter((group) => (
          group.group_id !== payload.group_id
        ))
      })
    },
    [DELETE_MEETING_GROUP_FAILURE]: (state) => ({
      ...state,
    }),
    [INIT_CART]: (state, { payload: initData }) => ({
      ...state,
      cart: initData.cart,
      groupName: initData.groupName,
      updateFlag: true,
      group_id: initData.group_id,
    })
  },
  initialState,
);

export default meetings;