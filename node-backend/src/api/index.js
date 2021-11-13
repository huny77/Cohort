import Router from 'koa-router';
import codes from './codes';

const api = new Router();

api.use('/codes', codes.routes());

// 라우터를 내보냄
export default api;
