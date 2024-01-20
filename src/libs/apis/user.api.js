import { getHTTP, postHTTP } from '../../configs/api.config';

// getUserById
// getUsersByName

export const getUserById = (userId) => {
  /** get user info */
  const res = getHTTP(`user/${userId}`);
  return res;
};

export const getAllUsers = () => {
  const res = getHTTP('user');
  return res;
};

export const getUserByName = () => {};

// userUpdate
export const updateProfile = (userId, name) => {
  /** userId, name */
  const res = postHTTP(`user/update/${userId}`, { name });
  return res;
};
