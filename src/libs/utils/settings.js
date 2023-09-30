import Cookies from 'js-cookie';
/*
Manage cookie lib
*/
export const setToken = (token) => {
  /**
   *  set expiration for token
   * */
  Cookies.set('token', token, { expires: 24 });
};

export const getToken = () => {
  /* format data */
  const token = Cookies.get('token');
  return token;
};

export const deleteToken = () => {
  Cookies.remove('token');
};

/* set userId in cookie */
export const setUserId = () => {};

export const getUserId = () => {};

export const deleteUserId = () => {};

// apply AI & dark/light mode
export const setUserSetting = () => {};

export const getUserSetting = () => {};

export const deleteUserSetting = () => {};
