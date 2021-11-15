import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as runAPI from '../lib/api/run';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'run/INITIALIZE'; // 모든 내용 초기화

const [CODE_RUN, CODE_RUN_SUCCESS, CODE_RUN_FAILURE] =
  createRequestActionTypes('run/CODE_RUN'); // 포스트 작성

export const initialize = createAction(INITIALIZE);

export const codeRun = createAction(CODE_RUN, ({ body, language }) => ({
  body,
  language,
}));

// 사가 생성
const codeRunSaga = createRequestSaga(CODE_RUN, runAPI.codeRun);
export function* runSaga() {
  yield takeLatest(CODE_RUN, codeRunSaga);
}

const initialState = {
  run: null,
  runError: null,
};

const run = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    // 코드 run 성공
    [CODE_RUN_SUCCESS]: (state, { payload: run }) => ({
      ...state,
      run,
    }),
    // 코드 run 실패
    [CODE_RUN_FAILURE]: (state, { payload: runError }) => ({
      ...state,
      runError,
    }),
  },
  initialState,
);

export default run;
