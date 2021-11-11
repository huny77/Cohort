import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import write, { writeSaga } from './write';
import posts, { postsSaga } from './posts';
import comments, { commentsSaga } from './comments';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  posts,
  comments,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postsSaga(), commentsSaga()]);
}

export default rootReducer;
