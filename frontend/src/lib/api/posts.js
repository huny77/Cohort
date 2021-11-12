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
  const test = '{id}';

  return client.get(`/api/posts/${test}?id=${id}`);
};
