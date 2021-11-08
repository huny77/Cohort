import client from './client';

// 로그인
export const oauth = ({ mail, image, name }) =>
  client.post('/app/users', { mail, image, name });

// 계정정보조회
export const check = (mail) => client.get(`/app/users?mail=${mail}`);
