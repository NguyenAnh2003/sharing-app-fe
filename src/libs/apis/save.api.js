/**
 * add like
 * delete like
 * get likes
 */

import { getHTTP, postHTTP } from '../../configs/api.config';

export const getSavesByPostId = (postId) => {
  const res = getHTTP(`saves/p/${postId}`);
  return res;
};

export const savePostByUserIdAndPostId = (userId, postId) => {
  const res = postHTTP('saves/create', { userId, postId });
  return res;
};
