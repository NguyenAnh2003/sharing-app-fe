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

export default axiosConfig;
