import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import write, { writeSaga } from './write';
import posts, { postsSaga } from './posts';
import comments, { commentsSaga } from './comments';
import post, { postSaga } from './post';
import like, { likeSaga } from './like';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  posts,
  comments,
  post,
  like,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postsSaga(),
    commentsSaga(),
    postSaga(),
    likeSaga(),
  ]);
}

export default rootReducer;
