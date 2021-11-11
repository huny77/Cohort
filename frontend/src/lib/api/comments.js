import client from './client';

export const writeComment = ({ post_id, content, mail }) =>
  client.post('/app/post/comments', {
    post_id,
    content,
    mail,
  });

export const readComments = (post_id) =>
  client.get(`/app/post/comments/${post_id}`);
