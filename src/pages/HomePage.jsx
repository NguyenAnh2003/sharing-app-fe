import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { useNavigate } from 'react-router-dom';

/* Replace for search page */

const HomePage = () => {
  const navigate = useNavigate(); // navigate define
  useEffect(() => {
    /** getCurrentUser */
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUser();
        console.log('current user', data);
      } catch (error) {
        if (error.status === 403) navigate('/signin');
      }
    };
    fetchData();

    /** getPosts */

    /** getFollowingUsers by userId
     * using current userId
     */

    /** getPostsByFollowingId
     * -> users that current user are following
     * */
  }, []);

  return (
    <div className='container'>
      <p className='text-3xl font-bold underline'>Home page the main</p>
    </div>
  );
};

export default HomePage;
