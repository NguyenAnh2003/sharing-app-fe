import React, { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/authAPI';

const useAuth = () => {
  useEffect(() => {
    const fetchAPI = async () => {
      /* token from cookie stored in header */
      const data = await getCurrentUser();
      console.log('current user', data);
      return data;
    };
    auth = fetchAPI();
  }, []);
  return null;
};

export default useAuth;
