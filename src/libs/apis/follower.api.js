import { getHTTP } from "../../configs/api.config"

/**
 * add follow
 * delete follow
 * get follow
 */
export const getFollowersByUserId = userId => {
  const res = getHTTP(`follow/get-followers/${userId}`)
  return res;
}