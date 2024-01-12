import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllPostsByUserId } from '../libs';
import { useDispatch } from 'react-redux';
import { saveCurrentUser } from '../redux';

/* Replace for search page */

const HomePage = () => {
  /** init */
  const navigate = useNavigate(); // navigate define
  const dispatch = useDispatch(); // dispatch state

  useEffect(() => {
    /** getCurrentUser */
    const fetchData = async () => {
      try {
        const { data, status } = await getCurrentUser();
        console.log('current user', data);
        if (status === 200) {
          dispatch(saveCurrentUser(data));
        }
      } catch (error) {
        if (error.status === 403) navigate('/signin');
      }
    };

    /** getPosts */
    const fetchPosts = async () => {
      try {
        const { data, status } = await getAllPostsByUserId('647464c4b24736704d3223c7');
        if (status === 200) console.log(data);
      } catch (error) {
        if (error.status === 500) toast.error('Internal error');
      }
    };

    fetchData();
    // fetchPosts();
  }, []);

  return (
    <div className="container">
      <p className="text-3xl font-bold underline">Home page the main</p>
    </div>
  );
};

export default HomePage;
