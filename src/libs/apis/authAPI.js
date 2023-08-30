// post(gmail, password) login
// token from cookie
/**
 * access token stored in cookie
 * need cookie to approach api
 */

import { getHTTP, postHTTP } from '../utils/apiConfig';

export const login = (gmail, password) => {
  const res = postHTTP('auth/login', {
    "gmail": gmail,
    "password": password,
  });
  return res;
};

export const register = () => {
  const res = postHTTP('auth');
  return res;
};

export const getCurrentUser = () => {
  const res = getHTTP('auth');
  return res;
};
