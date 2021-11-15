import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as likesAPI from '../lib/api/like';
import { takeLatest } from 'redux-saga/effects';

const [READ_LIKE, READ_LIKE_SUCCESS, READ_LIKE_FAILURE] =
  createRequestActionTypes('like/READ_LIKE');
const UNLOAD_LIKE = 'like/UNLOAD_LIKE'; // 페이지 벗어날 때 데이터 비우기

export const readLike = createAction(READ_LIKE, (id) => id);
export const unloadLike = createAction(UNLOAD_LIKE);

const readLikeSaga = createRequestSaga(READ_LIKE, likesAPI.readLike);

export function* likeSaga() {
  yield takeLatest(READ_LIKE, readLikeSaga);
}

const initialState = {
  like: null,
  error: null,
};

const like = handleActions(
  {
    [READ_LIKE_SUCCESS]: (state, { payload: like }) => ({
      ...state,
      like,
    }),
    [READ_LIKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LIKE]: () => initialState, // 데이터 초기값으로 바꾸기
  },
  initialState,
);

export default like;
