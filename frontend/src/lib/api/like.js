import client from './client';

// 좋아요 조회
export const readLike = (id) => client.get(`/app/post/likes/${id}`);

// 좋아요 등록
export const addLike = ({ mail, post_id }) =>
  client.post('/app/post/likes', {
    mail,
    post_id,
  });

// 좋아요 취소
export const removeLike = (mail, post_id) => {
  return client.delete(`/app/post/likes?mail=${mail}&pid=${post_id}`);
};
