import { getHTTP } from '../utils/apiConfig';
// getUserById
// getUsersByName


export const getUserById = (userId) => {
  const res = getHTTP(`user/${userId}`);
  return res;
};

export const getUserByName = () => {};

// userUpdate
export const updateProfile = () => {};
