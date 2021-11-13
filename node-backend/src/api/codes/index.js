import Router from 'koa-router';
import * as codesCtrl from './codes.ctrl';

const codes = new Router();

codes.post('/', codesCtrl.run);

export default codes;
