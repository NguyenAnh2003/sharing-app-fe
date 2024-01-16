import { deleteHTTP, getHTTP, postHTTP } from '../../configs/api.config';

/**
 * add follow
 * delete follow
 * get follow
 */
export const getFollowersByUserId = (userId) => {
  const res = getHTTP(`follow/get-followers/${userId}`);
  return res;
};

export const followUser = (userId, followingUserId) => {
  /** userId: followerId, followingUserId */
  const res = postHTTP('follow/create', { userId, followingUserId });
  return res;
};

export const unfollowUser = (userId, followingUserId) => {
  /** followingUserId, userId: followerId */
  const res = deleteHTTP(`follow/${followingUserId}/${userId}/delete`);
  return res;
};
