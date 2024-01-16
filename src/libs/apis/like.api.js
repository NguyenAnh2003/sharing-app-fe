/**
 * add like
 * delete like
 * get likes
 */

import { deleteHTTP, getHTTP, postHTTP } from '../../configs/api.config';

export const getLikes = () => {
  /** return array of likes w postId*/
};

export const getLikeByUserIdAndPostId = (userId, postId) => {
  /** return one specific like entity with userId and postId */
  const res = getHTTP(``);
  return res;
};

export const getLikesByPostId = (postId) => {
  const res = getHTTP(`likes/${postId}`);
  return res;
};

export const createLike = (userId, postId) => {
  /** create specific like with userId and postId */
  const res = postHTTP('likes/create', { userId, postId });
  return res;
};

export const deleteLike = (userId, postId) => {
  /** delete specific like entity w userId & postId */
  const res = deleteHTTP(`likes/p/${postId}/u/${userId}/delete`);
  return res;
};
