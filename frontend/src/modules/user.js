import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { removeCookie } from '../lib/cookie';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (mail) => mail);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

function checkFailureSaga() {
  try {
    // 쿠키 제거
    removeCookie('mail');
    removeCookie('name');
    removeCookie('image');
  } catch (e) {
    console.log('cookie is not working');
  }
}

function logoutSaga() {
  try {
    removeCookie('mail');
    removeCookie('name');
    removeCookie('image');
  } catch (e) {
    console.log(e);
  }
}

const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  mail: null,
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: mail }) => ({
      ...state,
      mail,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      mail: null,
      user: null,
    }),
  },
  initialState,
);
