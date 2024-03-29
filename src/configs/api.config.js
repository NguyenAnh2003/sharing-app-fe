import axios from 'axios';
import { getToken } from '../libs';

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

/**
 * config request
 * excluding adding access token to login and register feature
 */
axiosConfig.interceptors.request.use(
  (config) => {
    if (!config.url.includes('auth/signin') && !config.url.includes('auth/signup')) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.url.includes('/upload')) {
      /** set headers for upload end point */
      config.headers['Content-Type'] = 'multipart/form-data'; // using form data for upload file
    }
    return config;
  },
  (err) => {
    const errorResponse = {
      data: err.response.data,
      status: err.response.status,
      headers: err.response.headers,
    };
    return Promise.reject(errorResponse);
  }
);

/** config response */
axiosConfig.interceptors.response.use(
  (config) => {
    const responseData = {
      data: config.data,
      status: config.status,
      header: config.headers,
    };
    return responseData;
  },
  (err) => {
    const errorResponse = {
      data: err.response.data,
      status: err.response.status,
      headers: err.response.headers,
    };
    return Promise.reject(errorResponse);
  }
);

// post method
export const postHTTP = async (url, params = {}) => {
  const res = await axiosConfig.post(url, params);
  return res;
};

// get method
export const getHTTP = async (url) => {
  const res = await axiosConfig.get(url);
  return res;
};

// put method
export const putHTTP = async (url, params = {}) => {
  const res = await axiosConfig.put(url, params);
  return res;
};

// patch?

// delete method
export const deleteHTTP = async (url) => {
  const res = await axiosConfig.delete(url);
  return res;
};

export default axiosConfig;
