import axios from 'axios';

// take userInfo from cookies ?

const axiosClient = axios.create({
  baseURL: '',
  headers: {},
  // content-type: application/json
  
});

export default axiosClient;
