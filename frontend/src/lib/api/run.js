import client from './client';

export const codeRun = ({ body, language }) =>
  client.post('/node/codes', {
    body,
    language,
  });
