/**
 * add like
 * delete like
 * get likes
 */

import { getHTTP } from '../../configs/api.config';

export const getSavesByPostId = (postId) => {
  const res = getHTTP(`saves/p/${postId}`);
  return res;
};
