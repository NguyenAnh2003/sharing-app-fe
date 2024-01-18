import { getHTTP } from "../../configs/api.config";

// CRUD
export const getCommentsByPostId = (postId) => {
  const res = getHTTP(`comment/p/${postId}`);
  return res;
};