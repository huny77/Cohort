import client from './client';
import qs from 'qs';

export const writePost = ({ language, site, title, content, mail }) =>
  client.post('/app/post', {
    language,
    site,
    title,
    content,
    mail,
  });

export const listPosts = ({ page }) => {
  const queryString = qs.stringify({
    page,
  });

  return client.get(`/app/post?${queryString}`);
};

export const readPost = (id) => {
  return client.get(`/app/post/details/${id}`);
};

export const removePost = (id) => {
  return client.delete(`/app/post/${id}`);
};

export const bestPosts = () => {
  return client.get('/app/post/top5');
};
