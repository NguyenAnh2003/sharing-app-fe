import React, { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
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
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        /** posts api */
        await getAllPostsByUserId(currentUser.userId).then(({ data, status }) => {
          if (status === 200) {
            setPosts(data);
          }
        });

        /** user api */
        await getUserById(currentUser.userId).then(({ data, status }) => {
          if (status === 200) setUser(data);
          toast.success('Get user info succes');
        });

        /** followers api */
        await getFollowersByUserId(currentUser.userId).then(({ data, status }) => {
          if (status === 200) setFollowers(data);
        });
      } catch (error) {
        console.error(error);
      }
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
      <p className="text-3xl font-bold underline">Home page</p>
      {/** greeting user */}
      {user && (
        <Link to={'/create-post'}>
          Hello <strong>{user.name}</strong> Create your post
        </Link>
      )}
      {/** list of followers */}
      {/** list of posts */}
    </div>
  );
};

export default HomePage;
