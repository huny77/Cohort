import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'comments/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'comments/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE] =
  createRequestActionTypes('comments/WRITE_COMMENT'); // 코멘트 작성
const [READ_COMMENTS, READ_COMMENTS_SUCCESS, READ_COMMENTS_FAILURE] =
  createRequestActionTypes('comments/READ_COMMENTS');
const UNLOAD_COMMENTS = 'comments/UNLOAD_COMMENTS'; // 페이지 벗어날 때 데이터 비우기

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(
  WRITE_COMMENT,
  ({ post_id, content, mail }) => ({
    post_id,
    content,
    mail,
  }),
);
export const readComments = createAction(READ_COMMENTS, (id) => id);
export const unloadComments = createAction(UNLOAD_COMMENTS);

// 사가 생성
const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  postsAPI.writeComment,
);
const readCommentsSaga = createRequestSaga(
  READ_COMMENTS,
  postsAPI.readComments,
);

export function* commentsSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(READ_COMMENTS, readCommentsSaga);
}

const initialState = {
  content: '',
  comment: null,
  commentError: null,
  comments: null,
  commentsError: null,
};

const comments = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_COMMENT]: (state) => ({
      ...state,
      // comment와 commentError를 초기화
      comment: null,
      commentError: null,
    }),
    // 댓글 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    //  댓글 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    [READ_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
    }),
    [READ_COMMENTS_FAILURE]: (state, { payload: commentsError }) => ({
      ...state,
      commentsError,
    }),
    [UNLOAD_COMMENTS]: () => initialState, // 데이터 초기값으로 바꾸기
  },
  initialState,
);

export default comments;
