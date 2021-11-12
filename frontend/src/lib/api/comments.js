import client from './client';
import qs from 'qs';

export const writeComment = ({ post_id, content, mail }) =>
  client.post('/app/post/comments', {
    post_id,
    content,
    mail,
  });

export const readComments = ({ post_id, page }) => {
  return client.get(`/app/post/comments/${post_id}?page=${page}`);
};
