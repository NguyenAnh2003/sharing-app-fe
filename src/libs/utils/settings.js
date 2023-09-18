export const setToken = (token) => {
  /** set expiration for token */
  document.cookie = token;
};

export const getToken = () => {
  /* format data */
  token = document.cookie;
  return token;
};

export const deleteToken = () => {
  
};

/* set userId in cookie */
export const setUserId = () => {

};

export const getUserId = () => {
  
};

export const deleteUserId = () => {};

// apply AI & dark/light mode
export const setUserSetting = () => {};

export const getUserSetting = () => {};

export const deleteUserSetting = () => {};
