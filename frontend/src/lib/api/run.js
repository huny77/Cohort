import client from './client';

export const codeRun = ({ body, language, input }) =>
  client.post('/node/codes', {
    body,
    language,
    input,
  });
