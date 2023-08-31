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
    // temporarily defining token
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  // content-type: application/json
  // header - authorization - access token (taken from cookie)
});

// post method
export const postHTTP = async (url, params = {}) => {
  try {
    const res = await axiosConfig.post(url, params);
    // response config
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } catch (error) {
    console.log(error.message);
  }
};

// get method
export const getHTTP = async (url) => {
  try {
    const res = await axiosConfig.get(url);
    // response config
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } catch (error) {
    console.log(error.message);
  }
};

// put method
export const putHTTP = async (url, params = {}) => {
  try {
    const res = await axiosConfig.post(url, params);
    // response config
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } catch (error) {
    console.log(error.message);
  }
};

// patch?

// delete method
export const deleteHTTP = async (url) => {
  try {
    const res = await axiosConfig.get(url);
    // response config
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export default axiosConfig;
