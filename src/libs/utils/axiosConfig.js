import axios from 'axios';

// take userInfo from cookies ?

const axiosConfig = axios.create({
  baseURL: '',
  headers: {},
  // content-type: application/json
  // header - authorization
});

export default axiosConfig;
