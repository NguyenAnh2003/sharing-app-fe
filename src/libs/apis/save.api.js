/**
 * add like
 * delete like
 * get likes
 */

import { deleteHTTP, getHTTP, postHTTP } from '../../configs/api.config';

export const getSavesByPostId = (postId) => {
  const res = getHTTP(`saves/p/${postId}`);
  return res;
};

export const savePostByUserIdAndPostId = (userId, postId) => {
  const res = postHTTP('saves/create', { userId, postId });
  return res;
};

export const unSavePost = (userId, postId) => {
  /** unsave by userId and postId */
  const res = deleteHTTP(`/p/${postId}/u/${userId}/delete`);
  return res;
};
