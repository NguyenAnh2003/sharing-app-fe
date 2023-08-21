import axios from 'axios';

// take token from cookies ?

const axiosConfig = axios.create({
  baseURL: '',
  headers: {
    Authorization: `Bearer `,
  },
  // content-type: application/json
  // header - authorization - access token (taken from cookie)
});

// post method
export const postHTTP = async (url, params = {}) => {
  try {
    const res = await axiosConfig.post(url, params);
    // response config
    return (response = {
      data: res.data,
      status: res.status,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// get method
export const getHTTP = async (url) => {
  try {
    const res = await axiosConfig.get(url);
    // response config
    return (response = {
      data: res.data,
      status: res.status,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// put method
export const putHTTP = async (url, params = {}) => {
  try {
    const res = await axiosConfig.post(url, params);
    // response config
    return (response = {
      data: res.data,
      status: res.status,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// delete method
export const deleteHTTP = async (url) => {
  try {
    const res = await axiosConfig.get(url);
    // response config
    return (response = {
      data: res.data,
      status: res.status,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export default axiosConfig;
