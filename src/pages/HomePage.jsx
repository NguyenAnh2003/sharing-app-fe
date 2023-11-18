import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { getToken } from '../libs';
import { useNavigate } from 'react-router-dom';

/* Replace for search page */

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUser();
        console.log('current user', data);
      } catch (error) {
        if(error.status === 403) navigate('/signin')
      }
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
