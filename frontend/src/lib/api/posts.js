import client from './client';

export const writePost = ({ language, site, title, content, mail }) =>
  client.post('/app/post', {
    language,
    site,
    title,
    content,
    mail,
  });

export const listPosts = () => client.get('/app/post');
