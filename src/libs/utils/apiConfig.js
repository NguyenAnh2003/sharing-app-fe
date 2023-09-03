import axios from 'axios';

// take token from cookies ?
/**
 * Defining cookie -> get access token
 * Set expiration
 */
const token = document.cookie;

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  // content-type: application/json
  // header - authorization - access token (taken from cookie)
});

// post method
export const postHTTP = async (url, params = {}) => {
  const res = await axiosConfig
    .post(url, params)
    .catch((e) => {
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
export const getHTTP = async (url) => {
  const res = await axiosConfig.get(url).catch((e) => {
    const errorResponse = {
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
  const res = await axiosConfig
    .post(url, params)
    .catch((e) => {
      const errorResponse = {
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
  const res = await axiosConfig.get(url).catch((e) => {
    const errorResponse = {
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
