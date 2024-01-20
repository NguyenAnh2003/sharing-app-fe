import { deleteHTTP, getHTTP, postHTTP } from '../../configs/api.config';

// CRUD
export const getCommentsByPostId = (postId) => {
  const res = getHTTP(`comment/p/${postId}`);
  return res;
};

// create
export const createComment = (userId, postId, content) => {
  const res = postHTTP('comment/create', { userId, postId, content });
  return res;
};

// delete
export const deleteComment = (id) => {
  const res = deleteHTTP(`/${id}/delete`);
  return res;
};
