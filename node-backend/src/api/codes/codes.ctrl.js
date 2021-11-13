import Joi from 'joi';
import axios from 'axios';

// 코드 실행 결과 반환
export const run = async (ctx) => {
  console.log(ctx.request.body);
  const { language, body } = ctx.request.body;
  try {
    const res = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: '89f6caa269218082b93bef047da0b81c',
      clientSecret:
        'cd9ad586414c02ea6a8dfede2b83a9b5c32a388d4819626f798616a76df4ed2',
      script: body,
      language: language,
      versionIndex: '0',
    });
    console.log(res.data);
    ctx.body = res.data;
  } catch (e) {
    ctx.throw(500, e);
  }
};
