import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { useNavigate } from 'react-router-dom';

/* Replace for search page */

const HomePage = () => {
  
  useEffect(() => {
    /** getPosts */

    /** getFollowingUsers by userId 
     * using current userId
    */

    /** getPostsByFollowingId 
     * -> users that current user are following
     * */
  }, [])

  return (
    <div>
      <p>Home page the main</p>
    </div>
  );
};

export default HomePage;
