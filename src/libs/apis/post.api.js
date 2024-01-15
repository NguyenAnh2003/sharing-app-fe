// CRUD
/**
 * getPostsByUserId (including followingId)
 */

import { getHTTP } from '../../configs/api.config';

export const getAllPostsByUserId = (userId) => {
  const res = getHTTP(`p/get-all/${userId}`);
  return res;
};

export const getDataByPostId = (postId) => {
  const res = getHTTP(`p/${postId}`);
  return res;
};
