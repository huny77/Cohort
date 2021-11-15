import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createRequestActionTypes('posts/LIST_POSTS');

const [BEST_POSTS, BEST_POSTS_SUCCESS, BEST_POSTS_FAILURE] =
  createRequestActionTypes('posts/BEST_POSTS');

export const listPosts = createAction(LIST_POSTS);

export const bestPostsList = createAction(BEST_POSTS);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
const bestPostsSaga = createRequestSaga(BEST_POSTS, postsAPI.bestPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
  yield takeLatest(BEST_POSTS, bestPostsSaga);
}

const initilaState = {
  posts: null,
  error: null,
  lastPage: 1,
  bestPosts: null,
  bestPostsError: null,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
      lastPage: posts.data[0].totalPages,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [BEST_POSTS_SUCCESS]: (state, { payload: bestPosts }) => ({
      ...state,
      bestPosts,
    }),
    [BEST_POSTS_FAILURE]: (state, { payload: bestPostsError }) => ({
      ...state,
      bestPostsError,
    }),
  },
  initilaState,
);

export default posts;
