import React from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllPostsByUserId, getFollowersByUserId, getUserById } from '../libs';
import { useDispatch, useSelector } from 'react-redux';
import { saveCurrentUser } from '../redux';

/* Replace for search page */

const HomePage = () => {
  /** init */
  const navigate = useNavigate(); // navigate define
  const dispatch = useDispatch(); // dispatch state
  const currentUser = useSelector((state) => state.currentUser.userId);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([
        getAllPostsByUserId(currentUser.userId),
        getUserById(currentUser.userId),
        getFollowersByUserId(currentUser.userId),
      ]);
      console.log(res);
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    /** fetch user info direcly on Home page */
    const fetchUser = async () => {
      try {
        const { data, status } = await getCurrentUser();
        if (status === 200) {
          dispatch(saveCurrentUser(data));
        }
      } catch (error) {
        if (error) navigate('/signin');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container">
      <p className="text-3xl font-bold underline">Home page the main</p>
    </div>
  );
};

export default HomePage;
