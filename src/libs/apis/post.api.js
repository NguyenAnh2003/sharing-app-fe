// CRUD
/**
 * getPostsByUserId (including followingId)
 */

import { getHTTP } from "../../configs/api.config"

export const getAllPostsByUserId = (userId) => {
  const res = getHTTP(`p/get-all/${userId}`)
  return res;
}