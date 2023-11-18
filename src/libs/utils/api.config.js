import axios from 'axios';
import { getToken } from './settings';

// take token from cookies ?
/**
 * Defining cookie -> get access token
 * Set expiration
 */

const axiosConfig = axios.create({
  /**
   * base URL
   */
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/login') && !config.url.includes('/register')) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


// post method
export const postHTTP = async (url, params = {}, headers = {}) => {
  const res = await axiosConfig.post(url, params, headers).catch((e) => {
    const errorResponse = {
      data: e.response.data,
      status: e.response.status,
      headers: e.response.headers,
    };
    return Promise.reject(errorResponse);
  });
  return {
    data: res.data,
    status: res.status,
    headers: res.headers,
  };
};

// get method
export const getHTTP = async (url, headers = {}) => {
  const res = await axiosConfig.get(url, headers).catch((e) => {
    const errorResponse = {
      data: e.response.data,
      status: e.response.status,
      headers: e.response.headers,
    };
    return Promise.reject(errorResponse);
  });
  // response config
  return {
    data: res.data,
    status: res.status,
    headers: res.headers,
  };
};

// put method
export const putHTTP = async (url, params = {}) => {
  const res = await axiosConfig.put(url, params).catch((e) => {
    const errorResponse = {
      data: e.response.data,
      status: e.response.status,
      headers: e.response.headers,
    };
    return Promise.reject(errorResponse);
  });
  // response config
  return {
    data: res.data,
    status: res.status,
    headers: res.headers,
  };
};

// patch?

// delete method
export const deleteHTTP = async (url) => {
  const res = await axiosConfig.delete(url).catch((e) => {
    const errorResponse = {
      data: e.response.data,
      status: e.response.status,
      headers: e.response.headers,
    };
    return Promise.reject(errorResponse);
  });
  // response config
  return {
    data: res.data,
    status: res.status,
    headers: res.headers,
  };
};

export default axiosConfig;
