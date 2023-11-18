import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { getToken } from '../libs';

/* Replace for search page */

const HomePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUser();
      console.log('current user', data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <p>Home page the main</p>
    </div>
  );
};

export default HomePage;
