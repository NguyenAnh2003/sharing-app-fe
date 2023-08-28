// getUserById
// getUsersByName

import { getHTTP } from '../utils/apiConfig';

// userUpdate
export const getUserById = (userId) => {
  const res = getHTTP(`user/${userId}`);
  return res;
};

export const getUserByName = () => {};

export const updateProfile = () => {};
