import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'study/INITIALIZE'; // 모든 내용 초기화
const CHANGE_SESSION = 'study/CHANGE_FIELD'; // 세션 코드 변경

export const initialize = createAction(INITIALIZE);
export const changeSession = createAction(CHANGE_SESSION, (session) => session);

const initialState = {
  sessionCode: '',
};

const study = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_SESSION]: (state, { payload: session }) => ({
      sessionCode: session,
    }),
  },
  initialState,
);

export default study;
