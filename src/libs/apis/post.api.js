// CRUD
/**
 * getPostsByUserId (including followingId)
 */

import { getHTTP, postHTTP, putHTTP } from '../../configs/api.config';

/** create post */
export const createPost = (userId, categoryId, title, description, imageURL) => {
  /**
   * @param userId
   * @param categoryId
   * @param title
   * @param description
   * @param imageURL
   */
  const res = postHTTP('p/create', { userId, categoryId, title, description, imageURL });
  return res;
};

/** update post */
export const updatePost = (postId, userId, categoryId, title, description, imageURL) => {
  const res = putHTTP(`p/update/${postId}`, { userId, categoryId, title, description, imageURL });
  return res;
};

/** getAll by userId */
export const getAllPostsByUserId = (userId) => {
  const res = getHTTP(`p/get-all/${userId}`);
  return res;
};

/** get data by postId */
export const getDataByPostId = (postId) => {
  const res = getHTTP(`p/${postId}`);
  return res;
};

/** get posts by userId (that user's posts) */
export const getPostsByUserId = (userId) => {
  const res = getHTTP(`p/u/${userId}`);
  return res;
};
