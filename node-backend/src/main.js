import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api';

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/node', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT 가 지정되어있지 않다면 4000 을 사용
const port = 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
