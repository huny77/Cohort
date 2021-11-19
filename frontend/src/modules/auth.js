import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const [OAUTH, OAUTH_SUCCESS, OAUTH_FAILURE] =
  createRequestActionTypes('google/OAUTH');

export const oauth = createAction(OAUTH, ({ mail, image, name }) => ({
  mail,
  image,
  name,
}));

// 사가 생성
const oauthSaga = createRequestSaga(OAUTH, authAPI.oauth);
export function* authSaga() {
  yield takeLatest(OAUTH, oauthSaga);
}

const initialState = {
  google: null,
  googleError: null,
};

const auth = handleActions(
  {
    // 로그인 성공
    [OAUTH_SUCCESS]: (state, { payload: google }) => ({
      ...state,
      googleError: null,
      google,
    }),
    // 로그인 실패
    [OAUTH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      googleError: error,
    }),
  },
  initialState,
);

export default auth;
